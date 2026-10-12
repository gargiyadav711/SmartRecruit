import { useState, useEffect, useMemo } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const getInitials = (name = "") => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "SR";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getDefaultTimestamp = () => {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  return `${dateStr} · ${timeStr} IST`;
};

function AssessmentComplete() {
  const navigate = useNavigate();
  const [submissionData] = useState(() => {
    const defaults = {
      candidateName: "",
      candidateEmail: "",
      candidateId: "",
      savedResponsesCount: 0,
      receiptRef: "",
      submissionTime: getDefaultTimestamp(),
      proctoringAnalytics: {
        facePresencePct: 0,
        gazeDistribution: { center: 0, left: 0, right: 0 },
        maxFacesDetected: 0,
        longestFaceAbsenceSecs: 0,
        multipleFaceDurationSecs: 0,
        lookingAwayEvents: 0,
        tabSwitchesCount: 0,
        finalActivityStatus: "NOT RECORDED",
        finalVisualFlag: "NO",
        flagReason: "No live monitoring result was recorded."
      }
    };

    try {
      const user = JSON.parse(localStorage.getItem("user") || "null") || {};
      const storedSession = JSON.parse(localStorage.getItem("assessmentSubmission") || "null") || {};
      return {
        ...defaults,
        candidateName: user.name || "",
        candidateEmail: user.email || "",
        candidateId: user.id || user.candidateId || "",
        ...storedSession,
        submissionTime: storedSession.submissionTime || defaults.submissionTime,
        proctoringAnalytics: {
          ...defaults.proctoringAnalytics,
          ...(storedSession.proctoringAnalytics || {})
        }
      };
    } catch (error) {
      console.error("Failed to parse localStorage data:", error);
      return defaults;
    }
  });

  const proctoring = useMemo(
    () => submissionData.proctoringAnalytics || {},
    [submissionData.proctoringAnalytics]
  );
  const [legacySyncMessage, setLegacySyncMessage] = useState("");

  useEffect(() => {
    let active = true;
    async function syncPreviousSummary() {
      if (submissionData.savedToBackend || submissionData.submissionId || !submissionData.receiptRef) return;
      if (!localStorage.getItem("token")) return;
      try {
        const saved = await api("/api/profile/interview/submit-summary", {
          method: "POST",
          body: JSON.stringify({
            receiptRef: submissionData.receiptRef,
            assessmentTitle: submissionData.assessmentTitle,
            savedResponsesCount: submissionData.savedResponsesCount,
            submissionTime: submissionData.submissionTime,
            proctoringAnalytics: proctoring
          })
        });
        if (!active) return;
        const merged = {
          ...submissionData,
          submissionId: saved.resultId,
          receiptRef: saved.receiptRef || submissionData.receiptRef,
          savedToBackend: true,
          legacySummaryOnly: Boolean(saved.legacySummaryOnly || !submissionData.savedToBackend)
        };
        localStorage.setItem("assessmentSubmission", JSON.stringify(merged));
        setLegacySyncMessage("Your previous submission summary has been synced. Earlier versions did not save individual answers.");
      } catch (error) {
        if (active) setLegacySyncMessage(error.message || "Could not sync the previous submission summary. Please revisit this page after reconnecting to the backend.");
      }
    }
    syncPreviousSummary();
    return () => { active = false; };
  }, [submissionData, proctoring]);

  return (
    <div 
      className="min-h-screen bg-[#F8FAFC] text-slate-800 flex selection:bg-[#2563EB] selection:text-white"
      style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
    >
      <aside className="w-80 bg-[#0F172A] text-white p-6 flex flex-col justify-between hidden lg:flex select-none shadow-xl relative overflow-hidden sticky top-0 h-screen">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white font-bold flex items-center justify-center text-base shadow-lg shadow-blue-500/30">
              S
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight leading-none">SmartRecruit</h1>
              <p className="text-[10px] font-bold text-blue-400 tracking-wider uppercase mt-1">EVALUATION PORTAL</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2.5">YOUR ASSESSMENT</p>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3.5 flex items-center space-x-3 backdrop-blur-md shadow-inner">
              <div className="w-9 h-9 bg-[#2563EB] text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-md">
                {getInitials(submissionData.candidateName)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{submissionData.candidateName}</p>
                <p className="text-xs text-slate-400 truncate">{submissionData.candidateEmail}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-3">ASSESSMENT STEPS</p>
            <div className="space-y-2.5">
              <div className="flex items-start space-x-3 p-3 rounded-xl opacity-60">
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-blue-400 font-semibold text-xs flex items-center justify-center mt-0.5">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-300">Instructions</p>
                  <p className="text-[11px] text-slate-500">Completed</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-xl opacity-60">
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-blue-400 font-semibold text-xs flex items-center justify-center mt-0.5">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-300">Permission check</p>
                  <p className="text-[11px] text-slate-500">Verified</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-xl opacity-60">
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-blue-400 font-semibold text-xs flex items-center justify-center mt-0.5">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-300">Assessment overview</p>
                  <p className="text-[11px] text-slate-500">Completed</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 bg-blue-600/15 border border-blue-500/30 rounded-xl shadow-sm">
                <div className="w-6 h-6 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center mt-0.5 shadow-md shadow-blue-500/30">
                  4
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-400">Submission & Receipt</p>
                  <p className="text-[11px] text-slate-300">Evaluation Saved</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-800/60 border border-slate-700/50 rounded-xl relative z-10 mt-6">
          <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider mb-1">Receipt Reference</span>
          <span className="font-mono font-bold text-xs text-blue-400 block truncate">{submissionData.receiptRef || "Not available"}</span>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white/90 border-b border-blue-100 px-8 py-4 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md shadow-sm">
          <div className="text-xs text-slate-500 font-medium flex items-center space-x-2">
            <span>Candidate portal</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">Assessment Complete</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs text-slate-500 hidden sm:inline font-medium">Verified Submission</span>
            <div className="flex items-center space-x-2.5 bg-[#EFF6FF] border border-blue-100 px-3 py-1.5 rounded-xl">
              <div className="w-7 h-7 bg-[#2563EB] text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-sm">
                {getInitials(submissionData.candidateName)}
              </div>
              <span className="text-xs font-semibold text-[#0F172A]">{submissionData.candidateName}</span>
            </div>
          </div>
        </header>

        {legacySyncMessage && (
          <div role="status" className="max-w-5xl w-full mx-auto mt-4 px-8 text-xs text-[#2563EB]">
            {legacySyncMessage}
          </div>
        )}

        <main className="max-w-5xl w-full mx-auto px-8 py-10 flex-grow flex flex-col justify-center space-y-8">
          
          <div>
            <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg shadow-sm">
              • STEP 4 OF 4 • COMPLETE
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] mt-4 tracking-tight">
              Assessment Submitted.
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Your evaluation answers and proctoring telemetry logs have been saved securely.
            </p>
          </div>

          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:ring-4 hover:ring-blue-500/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-[#0F172A]">
              <div>
                <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block mb-1">Title</span>
                <span className="text-slate-700 truncate block">{submissionData.assessmentTitle || "Technical Assessment"}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block mb-1">Status</span>
                <div className="flex items-center space-x-1.5 text-[#2563EB]">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                  <span>Evaluated</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block mb-1">Responses</span>
                <span className="font-mono text-slate-800">{submissionData.savedResponsesCount} Saved</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block mb-1">Security</span>
                <span className="text-[#2563EB] font-mono">ENCRYPTED</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:ring-4 hover:ring-blue-500/10 space-y-5">
            <div className="flex items-center justify-between border-b border-blue-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Proctoring Integrity Report</h3>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                proctoring.visualActivityFlag === 'YES' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-blue-50 text-[#2563EB] border border-blue-200'
              }`}>
                Flag: {proctoring.visualActivityFlag || "NO"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-[#EFF6FF] p-3.5 rounded-xl border border-blue-100 space-y-1">
                <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-wider">Face Presence</span>
                <span className="font-mono font-bold text-[#0F172A] text-sm">{proctoring.facePresencePct ?? 0}%</span>
              </div>
              <div className="bg-[#EFF6FF] p-3.5 rounded-xl border border-blue-100 space-y-1">
                <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-wider">Tab Switches</span>
                <span className={`font-mono font-bold text-sm ${proctoring.tabSwitchesCount > 0 ? 'text-amber-600' : 'text-[#2563EB]'}`}>
                  {proctoring.tabSwitchesCount ?? 0} / 3
                </span>
              </div>
              <div className="bg-[#EFF6FF] p-3.5 rounded-xl border border-blue-100 space-y-1">
                <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-wider">Max Faces</span>
                <span className="font-mono font-bold text-[#0F172A] text-sm">{proctoring.maxFacesDetected ?? 1}</span>
              </div>
              <div className="bg-[#EFF6FF] p-3.5 rounded-xl border border-blue-100 space-y-1">
                <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-wider">Looking Away</span>
                <span className="font-mono font-bold text-[#0F172A] text-sm">{proctoring.lookingAwayEvents ?? 0} Events</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-[#EFF6FF] p-3.5 rounded-xl border border-blue-100 leading-relaxed">
              <strong className="text-[#0F172A] font-bold">Integrity Status:</strong> {proctoring.flagReason || "Candidate posture and gaze stable within normal parameters."}
            </div>
          </div>

          <div className="pt-6 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">Submitted on <strong className="text-[#0F172A]">{submissionData.submissionTime}</strong></span>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full sm:w-auto px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer border-none flex items-center justify-center space-x-2"
            >
              <span>Return to Dashboard</span>
              <span>→</span>
            </button>
          </div>

        </main>

        <footer className="py-5 px-8 bg-white border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <p>© SmartRecruit · Candidate assessment session</p>
          <p>Session Verified & Terminated</p>
        </footer>
      </div>
    </div>
  );
}

export default AssessmentComplete;