const axios = require('axios');

const API_URL = 'http://localhost:4000/api';
const ELECTION_ID = 'TEST_ELECTION_' + Date.now();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runTest() {
    try {
        console.log(`\n=== Starting DKG Test for ${ELECTION_ID} ===`);

        // 1. Create Election
        console.log('1. Creating Election...');
        await axios.post(`${API_URL}/elections/`, {
            election_id: ELECTION_ID,
            election_name: "DKG Test Election",
            creator_name: "TestBot",
            wallet_address: "0xAdmin"
        });
        console.log('   [PASS] Election Created');

        // 2. Setup Election (Add 3 Authorities)
        console.log('2. Setting up Authorities...');
        await axios.post(`${API_URL}/elections/setup`, {
            election_id: ELECTION_ID,
            start_time: new Date(),
            end_time: new Date(Date.now() + 3600000),
            result_time: new Date(Date.now() + 7200000),
            authorities: [
                { wallet_address: "0xAuth1" },
                { wallet_address: "0xAuth2" }
            ],
            candidates: [{ candidate_name: "C1", symbol_name: "S1" }]
        });
        console.log('   [PASS] Setup Complete');

        // 3. Complete Setup
        console.log('3. Completing Setup...');
        await axios.post(`${API_URL}/elections/complete-setup`, { election_id: ELECTION_ID });
        console.log('   [PASS] Setup Completed (Timer Started)');

        // 4. Force Close Registration (Init ElectionCrypto)
        console.log('4. Forcing Registration Close & Crypto Init...');
        await axios.post(`${API_URL}/elections/close-registration`, { election_id: ELECTION_ID });
        console.log('   [PASS] ElectionCrypto Initialized');

        // 5. Start Round 1 (Short duration: 2 seconds)
        console.log('5. Starting Round 1 (2s duration)...');
        await axios.post(`${API_URL}/dkg/start-round1`, {
            election_id: ELECTION_ID,
            duration: 2
        });
        console.log('   [PASS] Round 1 Started');

        // DEBUG: Check authorities
        const authRes = await axios.get(`${API_URL}/dkg/authorities/${ELECTION_ID}`);
        console.log('   DEBUG: Authorities:', JSON.stringify(authRes.data.authorities, null, 2));

        // 6. Submit PKs
        console.log('6. Submitting Public Keys...');
        const mockPK = "aaaa1111222233334444555566667777888899990000aaaabbbbccccddddeeee";
        for (let i = 1; i <= 3; i++) {
            await axios.post(`${API_URL}/dkg/round1/submit`, {
                election_id: ELECTION_ID,
                authority_id: i,
                pk: mockPK
            });
            console.log(`   -> Authority ${i} PK Submitted`);
        }
        console.log('   [PASS] All PKs Submitted');

        // Wait for Round 1 to expire (3s buffer)
        console.log('   ... Waiting for Round 1 to expire ...');
        await sleep(3000);

        // 7. Submit Commitments & Shares (Triggers Round 2 transition)
        console.log('7. Submitting Commitments (Round 2)...');
        const mockCommitment = "cccc1111222233334444555566667777888899990000aaaabbbbccccddddeeee";
        for (let i = 1; i <= 3; i++) {
            await axios.post(`${API_URL}/dkg/round2/submit`, {
                election_id: ELECTION_ID,
                authority_id: i,
                commitment: mockCommitment,
                shares: [
                    { to_authority_id: (i % 3) + 1, encrypted_share: "enc_share" },
                    { to_authority_id: ((i + 1) % 3) + 1, encrypted_share: "enc_share" }
                ]
            });
            console.log(`   -> Authority ${i} Commitment Submitted`);
        }
        console.log('   [PASS] All Commitments Submitted');

        // 8. Finalize
        console.log('8. Finalizing DKG...');
        const finalRes = await axios.post(`${API_URL}/dkg/finalize`, { election_id: ELECTION_ID });
        console.log('   [PASS] Finalized. Election PK:', finalRes.data.election_pk);

        // 9. Verify Check Status
        const statusRes = await axios.get(`${API_URL}/dkg/status/${ELECTION_ID}`);
        if (statusRes.data.status === 'completed') {
            console.log('\n✅ TEST SUCCESS: DKG Flow Verified Successfully!');
        } else {
            console.error('\n❌ TEST FAILED: Final status is ' + statusRes.data.status);
        }

    } catch (error) {
        console.error('\n❌ TEST FAILED:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else if (error.code) {
            console.error('Code:', error.code);
        }
    }
}

runTest();
