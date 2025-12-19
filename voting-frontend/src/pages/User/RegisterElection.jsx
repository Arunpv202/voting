import { useNavigate } from "react-router-dom";

export default function RegisterElection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full bg-white/10 p-8 rounded-2xl">
        <h2 className="text-xl font-bold mb-6">Register for Election</h2>

        <input className="input" placeholder="Election ID" />
        <input className="input" placeholder="Token Number" />

        <button
          onClick={() => navigate("/user/existing-elections")}
          className="w-full py-3 bg-indigo-600 rounded-lg"
        >
          Submit & Continue
        </button>
      </div>
    </div>
  );
}
