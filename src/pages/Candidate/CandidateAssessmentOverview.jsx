import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.jpeg";
function CandidateAssessmentOverview() {
  const navigate = useNavigate();

  const [candidateName] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null")?.name || "Candidate";
    } catch {
      return "Candidate";
    }
  });

  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(candidateName);

  function handleStartAssessment() {
    navigate("/candidate/assessment");
  }

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-slate-800 flex selection:bg-[#2563EB] selection:text-white"
      style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
    >
      <aside className="w-80 bg-[#0F172A] text-white p-6 flex flex-col justify-between hidden lg:flex select-none shadow-xl relative overflow-hidden sticky top-0 h-screen">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-blue-300/40 shrink-0 overflow-hidden">
              <img
                src={logo}
                alt="SmartRecruit Logo"
                className="w-full h-full object-contain"
              />
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
                {initials}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{candidateName}</p>
                <p className="text-xs text-slate-400">Candidate</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-3">ASSESSMENT STEPS</p>
            <div className="space-y-2.5">
              <div
                onClick={() => navigate("/candidate/instructions")}
                className="flex items-start space-x-3 p-3 rounded-xl cursor-pointer hover:bg-slate-800/60 transition-colors group"
              >
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-blue-400 font-semibold text-xs flex items-center justify-center mt-0.5 group-hover:border-blue-500">
                  <i className="fa-solid fa-circle-info text-[10px]"></i>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-300 group-hover:text-white">Instructions</p>
                  <p className="text-[11px] text-slate-500">Review before you begin</p>
                </div>
              </div>

              <div
                onClick={() => navigate("/candidate/system-check")}
                className="flex items-start space-x-3 p-3 rounded-xl cursor-pointer hover:bg-slate-800/60 transition-colors group"
              >
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-blue-400 font-semibold text-xs flex items-center justify-center mt-0.5 group-hover:border-blue-500">
                  <i className="fa-solid fa-circle-info text-[10px]"></i>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-300 group-hover:text-white">Permission check</p>
                  <p className="text-[11px] text-slate-500">Make sure your setup is ready</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 bg-blue-600/15 border border-blue-500/30 rounded-xl shadow-sm">
                <div className="w-6 h-6 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center mt-0.5 shadow-md shadow-blue-500/30">
                  3
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-400">Assessment overview</p>
                  <p className="text-[11px] text-slate-300">See what's included</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 bg-slate-800/30 border border-slate-800 rounded-xl opacity-60">
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-semibold text-xs flex items-center justify-center mt-0.5">
                  4
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-300">Assessment</p>
                  <p className="text-[11px] text-slate-500">90 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-800/60 border border-slate-700/50 rounded-xl relative z-10 mt-6">
          <p className="text-xs font-bold text-white mb-1">Need help?</p>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            Having trouble with a device? Check your settings or contact support before you start.
          </p>
          <button className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1 cursor-pointer bg-transparent border-none p-0 transition-colors">
            <span>Contact support</span>
            <span><i className="fa-solid fa-arrow-right"></i></span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white/90 border-b border-blue-100 px-8 py-4 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md shadow-sm">
          <div className="text-xs text-slate-500 font-medium flex items-center space-x-2">
            <span>Candidate portal</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">Assessment overview</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2.5 bg-[#EFF6FF] border border-blue-100 px-3 py-1.5 rounded-xl">
              <div className="w-7 h-7 bg-[#2563EB] text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-sm">
                {initials}
              </div>
              <span className="text-xs font-semibold text-[#0F172A]">{candidateName}</span>
            </div>
          </div>
        </header>

        <main className="max-w-5xl w-full mx-auto px-6 py-10 flex-grow flex flex-col justify-center space-y-8">
          <div>
            <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg shadow-sm">
              • STEP 3 OF 4 • OVERVIEW
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] mt-4 tracking-tight">
              Ready to begin your test.
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Everything is set up. Review the structure below before starting your timed session.
            </p>
          </div>

          <div className="bg-white border border-blue-100 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:ring-4 hover:ring-blue-500/10">
            <div className="flex items-center space-x-4">
              <div className="w-11 h-11 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-[#2563EB] shrink-0">
                <i className="fa-solid fa-circle-check text-base"></i>
              </div>
              <div>
                <h4 className="font-bold text-[#0F172A] text-sm sm:text-base">System setup verified</h4>
                <p className="text-slate-500 text-xs mt-0.5">Camera feed active and secure proctoring stream locked.</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#2563EB] bg-blue-50 border border-blue-200 px-3.5 py-2 rounded-xl flex items-center space-x-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
              <span>Ready to Launch</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white border border-blue-100 rounded-2xl p-5 flex items-center space-x-4 shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:ring-4 hover:ring-blue-500/10">
              <div className="w-11 h-11 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-[#2563EB] text-base shrink-0">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</p>
                <p className="text-sm font-bold text-[#0F172A] mt-0.5">90 Minutes</p>
              </div>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl p-5 flex items-center space-x-4 shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:ring-4 hover:ring-blue-500/10">
              <div className="w-11 h-11 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-[#2563EB] text-base shrink-0">
                <i className="fa-solid fa-clipboard-list"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Questions</p>
                <p className="text-sm font-bold text-[#0F172A] mt-0.5">45 Questions</p>
              </div>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl p-5 flex items-center space-x-4 shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:ring-4 hover:ring-blue-500/10">
              <div className="w-11 h-11 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-[#2563EB] text-base shrink-0">
                <i className="fa-solid fa-code"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assessment</p>
                <p className="text-sm font-bold text-[#0F172A] mt-0.5 truncate max-w-[120px]">Technical Screen</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:ring-4 hover:ring-blue-500/10">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm font-bold text-[#0F172A]">What you'll be assessed on</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-[#EFF6FF] border border-blue-100 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 bg-white border border-blue-200 rounded-xl flex items-center justify-center text-[#2563EB] shrink-0">
                    <i className="fa-solid fa-laptop-code"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-sm">Technical Knowledge</h4>
                    <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                      Role-specific technical questions to evaluate your understanding of key concepts, state management, and modern browser standards.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#2563EB] bg-white border border-blue-200 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0">
                  Multiple Choice & Concepts
                </span>
              </div>

              <div className="bg-[#EFF6FF] border border-blue-100 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 bg-white border border-blue-200 rounded-xl flex items-center justify-center text-[#2563EB] shrink-0">
                    <i className="fa-solid fa-desktop"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-sm">Coding Challenge</h4>
                    <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                      Write, run and submit an algorithmic and UI component solution in a live sandboxed code runtime environment.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#2563EB] bg-white border border-blue-200 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0">
                  In-Browser IDE
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:ring-4 hover:ring-blue-500/10">
            <h3 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-5">Assessment Sequence & Flow</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#EFF6FF] border-2 border-[#2563EB] rounded-xl p-4 flex flex-col justify-between shadow-sm relative">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-[#2563EB] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">STEP 1</span>
                    <span className="text-[11px] font-semibold text-[#2563EB]">Starting Next</span>
                  </div>
                  <h4 className="font-bold text-[#0F172A] text-xs">Technical Questions</h4>
                  <p className="text-slate-600 text-[11px] mt-1">45 Questions • ~90 min</p>
                </div>
                <div className="mt-4 pt-2 border-t border-blue-200 flex items-center text-[10px] text-[#2563EB] font-bold">
                  <span>Begin Section 1</span>
                  <span className="ml-1">→</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between opacity-70">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">STEP 2</span>
                    <i className="fa-solid fa-arrow-right text-slate-400 text-xs"></i>
                  </div>
                  <h4 className="font-bold text-slate-700 text-xs">Coding Challenge</h4>
                  <p className="text-slate-500 text-[11px] mt-1">1 Challenge • ~15 min</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-medium">
                  Locked until Step 1 complete
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between opacity-70">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">STEP 3</span>
                    <i className="fa-solid fa-circle-check text-slate-400 text-xs"></i>
                  </div>
                  <h4 className="font-bold text-slate-700 text-xs">Submit & Review</h4>
                  <p className="text-slate-500 text-[11px] mt-1">Summary receipt</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-medium">
                  Final step
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-white border border-blue-100 rounded-2xl text-xs text-slate-600 leading-relaxed shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:ring-4 hover:ring-blue-500/10">
            <i className="fa-solid fa-shield-halved text-[#2563EB] mt-0.5 shrink-0"></i>
            <div>
              <span className="font-bold text-[#0F172A]">Once you start, the assessment timer will begin.</span><br />
              Continuous proctoring remains active. Do not close or refresh your browser tab during the active session.
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-blue-100">
            <button
              type="button"
              onClick={() => navigate("/candidate/system-check")}
              className="text-xs font-semibold text-slate-500 hover:text-[#0F172A] transition-colors cursor-pointer flex items-center space-x-1.5 border border-blue-500 px-3 py-1.5 rounded-md bg-transparent"
            >
              <span>Back to System Check</span>
            </button>

            <div className="flex flex-col items-end">
              <button
                type="button"
                onClick={handleStartAssessment}
                className="py-3 px-6 rounded-xl font-bold text-xs bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white shadow-lg shadow-blue-500/25 transition-all flex items-center space-x-2 cursor-pointer border-none"
              >
                <span>Start Assessment</span>
                <span>→</span>
              </button>
              <p className="text-[10px] text-slate-500 mt-1.5">Your timed evaluation session will begin immediately.</p>
            </div>
          </div>

        </main>

        <footer className="py-5 px-8 bg-white border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <p>© SmartRecruit · Secure candidate portal</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#2563EB] transition-colors">Privacy policy</a>
            <span>•</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#2563EB] transition-colors">Candidate terms</a>
          </div>
        </footer>

      </div>

    </div>
  );
}

export default CandidateAssessmentOverview;