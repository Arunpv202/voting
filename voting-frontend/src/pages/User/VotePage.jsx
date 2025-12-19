import { useNavigate } from "react-router-dom";

export default function VotePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <h2 className="text-2xl font-bold mb-6">Vote Your Candidate</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {["Alice", "Bob"].map((c) => (
          <div
            key={c}
            className="p-6 bg-white/10 rounded-2xl border border-white/20"
          >
            <h3 className="text-xl mb-4">{c}</h3>
            <button className="w-full py-2 bg-indigo-600 rounded-lg">
              Vote
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/user/participated")}
        className="mt-8 px-6 py-3 bg-green-600 rounded-lg"
      >
        Return to Participated Elections
      </button>
    </div>
  );
}
