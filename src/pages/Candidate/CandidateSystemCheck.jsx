import { useNavigate } from "react-router-dom";

function CandidateSystemCheck() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="text-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 text-xl">
            ✓
          </span>
          <h1 className="mt-5 text-3xl font-bold text-slate-900 tracking-tight">
            System Check
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Your environment looks ready. You can now start the assessment.
          </p>
        </div>

        <div className="mt-8 space-y-3 text-sm text-slate-700">
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <span>Camera</span>
            <span className="font-semibold text-emerald-600">Connected</span>
          </div>
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <span>Microphone</span>
            <span className="font-semibold text-emerald-600">Ready</span>
          </div>
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <span>Internet</span>
            <span className="font-semibold text-emerald-600">Stable</span>
          </div>
        </div>

        <div className="mt-8 flex justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate("/candidate/instructions")}
            className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
          >
            Back
          </button>

          <button
            type="button"
            onClick={() => navigate("/candidate/login")}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CandidateSystemCheck;
