import { useNavigate } from "react-router-dom";

export default function ExistingElections() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <h2 className="text-3xl font-bold mb-6">Elections</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <ElectionBlock
          title="Ongoing"
          action="Enter Election"
          onClick={() => navigate("/user/enter-election")}
        />
        <ElectionBlock
          title="Upcoming"
          action="Get Credential"
          onClick={() => alert("Credentials will be enabled soon")}
        />
        <ElectionBlock
          title="Closed"
          action="View Result"
          onClick={() => alert("Election Result")}
        />
      </div>
    </div>
  );
}

function ElectionBlock({ title, action, onClick }) {
  return (
    <div className="p-6 bg-white/10 rounded-2xl border border-white/20">
      <h3 className="text-xl font-semibold mb-4">{title} Election</h3>
      <button
        onClick={onClick}
        className="w-full py-2 bg-indigo-600 rounded-lg"
      >
        {action}
      </button>
    </div>
  );
}
