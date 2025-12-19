import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConnectWallet() {
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("MetaMask not detected. Please install MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      localStorage.setItem("wallet", accounts[0]);
    } catch (error) {
      setError("Wallet connection rejected");
    }
  };

  useEffect(() => {
    if (account) {
      if (role === "admin") navigate("/admin/dashboard");
      else navigate("/user/dashboard");
    }
  }, [account, navigate, role]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Connect Wallet
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {!account ? (
          <button
            onClick={connectWallet}
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Connect MetaMask
          </button>
        ) : (
          <div className="text-center">
            <p className="text-gray-400 mb-2">Connected Wallet</p>
            <p className="font-mono text-sm">
              {account.slice(0, 6)}...{account.slice(-4)}
            </p>
          </div>
        )}

        {!window.ethereum && (
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noreferrer"
            className="block text-center mt-6 text-indigo-400 underline"
          >
            Install MetaMask
          </a>
        )}
      </div>
    </div>
  );
}
