import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CandidateAssessmentOverview() {
  const navigate = useNavigate();

  function handleStartAssessment() {
    alert("Starting assessment session now!");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">

      <header className="bg-white border-b border-slate-200 px-8 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
            <span className="text-lg font-bold text-slate-900 tracking-tight">SmartRecruit</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
            Evaluation Portal
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm">
            👤
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900 leading-tight">Priya Tiwari</p>
            <p className="text-xs text-slate-400 font-medium">candidate</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl w-full mx-auto px-4 py-8 flex-grow">

        <div className="bg-white rounded-2xl px-8 py-5 shadow-sm border border-slate-200/80 mb-6">
          <div className="flex items-center justify-between relative">

            <div className="flex items-center space-x-2.5 z-10 cursor-pointer" onClick={() => navigate("/candidate/instructions")}>
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-md">✓</span>
              <span className="text-xs font-medium text-slate-500">Instructions</span>
            </div>

            <div className="flex-1 border-t border-slate-200 mx-4"></div>

            <div className="flex items-center space-x-2.5 z-10 cursor-pointer" onClick={() => navigate("/candidate/system-check")}>
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-md">✓</span>
              <span className="text-xs font-medium text-slate-500">Permission check</span>
            </div>

            <div className="flex-1 border-t border-slate-200 mx-4"></div>

            <div className="flex items-center space-x-2.5 z-10">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-blue-500/20">3</span>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Assessment overview</span>
            </div>

            <div className="flex-1 border-t border-slate-200 mx-4"></div>

            <div className="flex items-center space-x-2.5 z-10 opacity-70">
              <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 font-semibold text-xs flex items-center justify-center">4</span>
              <span className="text-xs font-medium text-slate-500">Assessment</span>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/80">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <div className="flex items-center space-x-2.5">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span>READY TO BEGIN</span>
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg flex items-center space-x-1">
                <i className="fa-solid fa-circle-check text-[10px]"></i>
                <span>All 3 System Checks Verified</span>
              </span>
            </div>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 font-mono">
              Candidate ID: #SR-94021
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frontend Developer Assessment
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Everything is ready. Review the assessment structure and sequence below before you launch your timed evaluation session.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

            <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex items-center space-x-3.5">
              <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-blue-600 text-sm">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">30 Minutes</p>
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex items-center space-x-3.5">
              <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-blue-600 text-sm">
                <i className="fa-solid fa-clipboard-list"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Questions</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">6 Questions</p>
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex items-center space-x-3.5">
              <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-blue-600 text-sm">
                <i className="fa-solid fa-code"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assessment</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5 truncate max-w-[130px]">Technical Screen</p>
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex items-center space-x-3.5">
              <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-blue-600 text-sm">
                <i className="fa-solid fa-user-tie"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Role</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5 truncate max-w-[130px]">Frontend Devel...</p>
              </div>
            </div>

          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-slate-900">What you’ll be assessed on</h3>
              <span className="text-xs text-slate-400 font-medium">3 Modules • Adaptive Weighting</span>
            </div>

            <div className="space-y-3">

              <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 bg-white shadow-sm border border-slate-200 rounded-xl flex items-center justify-center text-blue-600">
                    <i className="fa-solid fa-laptop-code"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Technical Knowledge</h4>
                    <p className="text-slate-500 text-xs mt-0.5">Role-specific technical questions to evaluate your understanding of key concepts, state management, and modern browser standards.</p>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm whitespace-nowrap ml-4">
                  Multiple Choice & Concepts
                </span>
              </div>

              <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 bg-white shadow-sm border border-slate-200 rounded-xl flex items-center justify-center text-blue-600">
                    <i className="fa-solid fa-microphone"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Spoken Technical Response</h4>
                    <p className="text-slate-500 text-xs mt-0.5">Respond verbally to selected architecture scenarios. Clear verbal explanation of software tradeoffs and approach.</p>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm whitespace-nowrap ml-4">
                  Audio Recording
                </span>
              </div>

              <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 bg-white shadow-sm border border-slate-200 rounded-xl flex items-center justify-center text-blue-600">
                    <i className="fa-solid fa-desktop"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Coding Challenge</h4>
                    <p className="text-slate-500 text-xs mt-0.5">Write, run and submit an algorithmic and UI component solution in a live sandboxed code runtime environment.</p>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm whitespace-nowrap ml-4">
                  In-Browser IDE
                </span>
              </div>

            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Assessment Sequence & Flow</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">

              <div className="bg-slate-50/90 border-2 border-blue-600 rounded-xl p-4 flex flex-col justify-between shadow-sm relative">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">STEP 1</span>
                    <span className="text-[11px] font-semibold text-blue-600">Starting Next</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">Technical Questions</h4>
                  <p className="text-slate-500 text-[11px] mt-1">4 Questions • ~10 min</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center text-[10px] text-blue-600 font-bold">
                  <span>Begin Section 1</span>
                  <span className="ml-1">→</span>
                </div>
              </div>

              <div className="bg-slate-50/60 border border-slate-200 rounded-xl p-4 flex flex-col justify-between opacity-80">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">STEP 2</span>
                    <i className="fa-solid fa-arrow-right text-slate-400 text-xs"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">Spoken Response</h4>
                  <p className="text-slate-500 text-[11px] mt-1">1 Prompt • ~5 min</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400 font-medium">
                  Locked until Step 1
                </div>
              </div>

              <div className="bg-slate-50/60 border border-slate-200 rounded-xl p-4 flex flex-col justify-between opacity-80">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">STEP 3</span>
                    <i className="fa-solid fa-arrow-right text-slate-400 text-xs"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">Coding Challenge</h4>
                  <p className="text-slate-500 text-[11px] mt-1">1 Challenge • ~15 min</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400 font-medium">
                  Locked until Step 2
                </div>
              </div>

              <div className="bg-slate-50/60 border border-slate-200 rounded-xl p-4 flex flex-col justify-between opacity-80">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">STEP 4</span>
                    <i className="fa-solid fa-circle-check text-slate-400 text-xs"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">Submit & Review</h4>
                  <p className="text-slate-500 text-[11px] mt-1">Summary receipt</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400 font-medium">
                  Final step
                </div>
              </div>

            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-slate-50/80 border border-slate-200 rounded-xl mb-8 text-xs text-slate-600 leading-relaxed">
            <i className="fa-solid fa-circle-info text-blue-600 mt-0.5"></i>
            <div>
              <span className="font-bold text-slate-900">Once you start, the assessment timer will begin.</span><br />
              You can review your answers within each section before final submission. Do not close or refresh your browser tab during the active session.
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate("/candidate/system-check")}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <span>←</span>
              <span>Back to System Check</span>
            </button>

            <div className="flex flex-col items-end">
              <button
                type="button"
                onClick={handleStartAssessment}
                className="py-3 px-6 rounded-xl font-medium text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Start Assessment</span>
                <span>→</span>
              </button>
              <p className="text-[10px] text-slate-400 mt-1.5">Your assessment session will begin immediately.</p>
            </div>
          </div>

        </div>
      </main>

      <footer className="py-5 px-8 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
        <p>🔒 Powered by SmartRecruit Candidate Portal • Secure & Confidential</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-slate-600 transition-colors">Candidate Terms</a>
        </div>
      </footer>

    </div>
  );
}

export default CandidateAssessmentOverview;