import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-6">
        <Card
          title="Register Election"
          desc="Enter election ID & token"
          onClick={() => navigate("/user/register-election")}
        />
        <Card
          title="Participated / Existing Elections"
          desc="View ongoing, upcoming & closed elections"
          onClick={() => navigate("/user/existing-elections")}
        />
      </div>
    </div>
  );
}

function Card({ title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-8 rounded-2xl bg-white/10 border border-white/20 hover:border-indigo-500 hover:scale-105 transition"
    >
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
