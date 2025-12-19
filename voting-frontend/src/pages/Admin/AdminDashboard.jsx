import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex items-center justify-center">
      <div className="max-w-4xl w-full px-6">
        <h1 className="text-3xl font-bold mb-10 text-center">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DashboardCard
            title="Create Election"
            desc="Register users and setup election"
            onClick={() => navigate("/admin/create-election")}
          />

          <DashboardCard
            title="View Created Elections"
            desc="View elections and calculate results"
            onClick={() => navigate("/admin/view-elections")}
          />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-indigo-500 hover:scale-105 transition"
    >
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
