export default function ViewElections() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <h2 className="text-3xl font-bold mb-6">My Elections</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/10 border border-white/20">
          <h3 className="text-xl font-semibold">Student Council Election</h3>
          <p className="text-gray-400">Status: Active</p>

          <button className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg">
            Calculate Result
          </button>
        </div>
      </div>
    </div>
  );
}
