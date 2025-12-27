import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Round1 from './Round1';
import Round2 from './Round2';

export default function DKGDashboard() {
    const { electionId } = useParams();
    const [status, setStatus] = useState('loading');
    const [dkgState, setDkgState] = useState(null);

    // UI Flow: 'buttons' -> 'enter-id' -> 'round'
    const [view, setView] = useState('buttons');
    const [selectedRound, setSelectedRound] = useState(null); // 'round1' or 'round2'
    const [authorityIdInput, setAuthorityIdInput] = useState('');
    const [confirmedAuthorityId, setConfirmedAuthorityId] = useState(null);

    const fetchStatus = async () => {
        if (!electionId) return;
        try {
            const res = await fetch(`http://localhost:4000/api/dkg/status/${electionId}`);
            if (res.ok) {
                const data = await res.json();
                setStatus(data.status);
                setDkgState(data);
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 5000);
        return () => clearInterval(interval);
    }, [electionId]);

    const handleRoundButtonClick = (round) => {
        setSelectedRound(round);
        setView('enter-id');
    };

    const handleIdSubmit = (e) => {
        e.preventDefault();
        if (!authorityIdInput) {
            alert('Please enter your Authority ID');
            return;
        }
        setConfirmedAuthorityId(authorityIdInput);
        setView('round');
    };

    const handleBack = () => {
        setView('buttons');
        setSelectedRound(null);
        setAuthorityIdInput('');
        setConfirmedAuthorityId(null);
    };

    const isRound1Enabled = status === 'setup' || status === 'round1';
    const isRound2Enabled = status === 'round1' || status === 'round2' || status === 'completed';

    if (status === 'loading') return <div className="p-10 text-white">Loading DKG Status...</div>;
    if (status === 'error') return (
        <div className="p-10 text-red-500">
            <h2 className="text-xl font-bold">Error loading DKG status</h2>
            <p>Invalid Election ID: {String(electionId)}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">DKG Dashboard</h1>
                    {view !== 'buttons' && (
                        <button
                            onClick={handleBack}
                            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            ← Back
                        </button>
                    )}
                </div>

                <div className="mb-6 text-center">
                    <p className="text-gray-400 text-sm">Election ID: <span className="font-mono text-indigo-400">{electionId}</span></p>
                </div>

                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 shadow-xl min-h-[500px]">

                    {/* VIEW 1: ROUND BUTTONS */}
                    {view === 'buttons' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Round 1 Button */}
                            <button
                                disabled={!isRound1Enabled}
                                onClick={() => handleRoundButtonClick('round1')}
                                className={`group relative p-10 rounded-2xl border-2 text-left transition-all transform hover:scale-105 ${isRound1Enabled
                                        ? 'bg-gradient-to-br from-indigo-900/40 to-slate-900/80 border-indigo-500/60 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/30 cursor-pointer'
                                        : 'bg-slate-900/30 border-gray-700/30 opacity-40 cursor-not-allowed'
                                    }`}
                            >
                                <div className="absolute top-4 right-4">
                                    {isRound1Enabled && <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />}
                                </div>
                                <h2 className={`text-3xl font-black mb-3 ${isRound1Enabled ? 'text-white group-hover:text-indigo-300' : 'text-gray-600'}`}>
                                    Round 1
                                </h2>
                                <p className="text-sm text-indigo-400 font-mono mb-4 uppercase tracking-wider">Key Generation</p>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Generate your secret scalar and submit your public key commitment to participate in the distributed key generation ceremony.
                                </p>
                            </button>

                            {/* Round 2 Button */}
                            <button
                                disabled={!isRound2Enabled}
                                onClick={() => handleRoundButtonClick('round2')}
                                className={`group relative p-10 rounded-2xl border-2 text-left transition-all transform hover:scale-105 ${isRound2Enabled
                                        ? 'bg-gradient-to-br from-purple-900/40 to-slate-900/80 border-purple-500/60 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/30 cursor-pointer'
                                        : 'bg-slate-900/30 border-gray-700/30 opacity-40 cursor-not-allowed'
                                    }`}
                            >
                                <div className="absolute top-4 right-4">
                                    {isRound2Enabled && <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />}
                                </div>
                                <h2 className={`text-3xl font-black mb-3 ${isRound2Enabled ? 'text-white group-hover:text-purple-300' : 'text-gray-600'}`}>
                                    Round 2
                                </h2>
                                <p className="text-sm text-purple-400 font-mono mb-4 uppercase tracking-wider">Share Distribution</p>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Compute polynomial shares, encrypt them using ECDH, and securely distribute to other authorities.
                                </p>
                            </button>
                        </div>
                    )}

                    {/* VIEW 2: ENTER AUTHORITY ID */}
                    {view === 'enter-id' && (
                        <div className="max-w-md mx-auto mt-12">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold mb-2">
                                    {selectedRound === 'round1' ? 'Round 1' : 'Round 2'}
                                </h2>
                                <p className="text-gray-400 text-sm">Enter your Authority ID to continue</p>
                            </div>

                            <form onSubmit={handleIdSubmit} className="bg-slate-800/50 p-8 rounded-2xl border border-white/10 shadow-xl">
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-3 tracking-wider">
                                    Authority ID
                                </label>
                                <input
                                    type="text"
                                    autoFocus
                                    value={authorityIdInput}
                                    onChange={(e) => setAuthorityIdInput(e.target.value)}
                                    className="w-full bg-black/40 border border-white/20 rounded-xl px-5 py-4 text-xl font-mono focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                                    placeholder="e.g., 1"
                                />
                                <p className="text-xs text-gray-500 mt-3 mb-6">
                                    This is the ID assigned to you during election setup
                                </p>
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40"
                                >
                                    Continue →
                                </button>
                            </form>
                        </div>
                    )}

                    {/* VIEW 3: ROUND COMPONENT */}
                    {view === 'round' && selectedRound === 'round1' && (
                        <Round1
                            electionId={electionId}
                            authorityId={confirmedAuthorityId}
                            dkgState={dkgState}
                            refresh={fetchStatus}
                        />
                    )}

                    {view === 'round' && selectedRound === 'round2' && (
                        <Round2
                            electionId={electionId}
                            authorityId={confirmedAuthorityId}
                            dkgState={dkgState}
                            refresh={fetchStatus}
                        />
                    )}

                </div>
            </div>
        </div>
    );
}
