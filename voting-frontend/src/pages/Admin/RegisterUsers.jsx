import { useNavigate } from "react-router-dom";

export default function RegisterUsers() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-xl bg-white/10 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">Register Users</h2>

        <input className="input" placeholder="User Name" />
        <input className="input" placeholder="Age" />
        <input className="input" placeholder="Address" />

        <button className="w-full py-2 bg-emerald-600 rounded-lg mt-4">
          Add User
        </button>

        <button
          onClick={() => navigate("/admin/election-setup")}
          className="w-full mt-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Next: Setup Election
        </button>
      </div>
    </div>
  );
}
