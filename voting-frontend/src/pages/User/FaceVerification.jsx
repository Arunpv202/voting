import { useNavigate } from "react-router-dom";

export default function FaceVerification() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full bg-white/10 p-8 rounded-2xl text-center">
        <h2 className="text-xl font-bold mb-4">Face Verification</h2>

        <input type="file" className="input" />

        <button
          onClick={() => navigate("/user/vote")}
          className="w-full py-3 bg-green-600 rounded-lg"
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
}
