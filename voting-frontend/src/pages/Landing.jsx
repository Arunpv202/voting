import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    localStorage.setItem("role", role);
    navigate("/connect-wallet");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Blockchain Secure Voting
        </h1>
        <p className="text-gray-400 mb-10">
          Transparent • Secure • Decentralized
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* USER CARD */}
          <div
            onClick={() => selectRole("user")}
            className="cursor-pointer p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-indigo-500 hover:scale-105 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">User</h2>
            <p className="text-gray-400">
              Participate in elections securely
            </p>
            <button className="mt-6 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700">
              Connect Wallet
            </button>
          </div>

          {/* ADMIN CARD */}
          <div
            onClick={() => selectRole("admin")}
            className="cursor-pointer p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-emerald-500 hover:scale-105 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Admin</h2>
            <p className="text-gray-400">
              Create and manage elections
            </p>
            <button className="mt-6 px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
