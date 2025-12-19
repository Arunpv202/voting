import { useNavigate } from "react-router-dom";

export default function ElectionSetup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-xl bg-white/10 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">Election Setup</h2>

        <input className="input" placeholder="Candidate Name" />
        <input className="input" placeholder="Symbol" />
        <input type="file" className="input" />
        <textarea className="input" placeholder="Election Description" />

        <button className="w-full py-2 bg-emerald-600 rounded-lg mt-4">
          Add Candidate
        </button>

        <button
          onClick={() => navigate("/admin/view-elections")}
          className="w-full mt-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Complete Election
        </button>
      </div>
    </div>
  );
}
