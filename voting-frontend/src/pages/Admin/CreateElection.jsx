import { useNavigate } from "react-router-dom";

export default function CreateElection() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/admin/register-users");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-xl bg-white/10 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">Create Election</h2>

        <input className="input" placeholder="Election Name" />
        <input className="input" placeholder="Election ID" />
        <input className="input" placeholder="Election Number" />

        <button
          onClick={handleNext}
          className="w-full mt-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Next: Register Users
        </button>
      </div>
    </div>
  );
}
