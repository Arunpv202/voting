import { useNavigate } from "react-router-dom";

export default function EnterElection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full bg-white/10 p-8 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Enter Election</h2>

        <input className="input" placeholder="Voter ID" />

        <button
          onClick={() => navigate("/user/face-verification")}
          className="w-full py-3 bg-indigo-600 rounded-lg"
        >
          Proceed to Face Scan
        </button>
      </div>
    </div>
  );
}
