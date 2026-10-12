import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CandidateInstructions() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
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

  function handleContinue() {
    if (!agreed) {
      alert("Please confirm the requirements before proceeding.");
      return;
    }
    navigate("/candidate/system-check");
  }

  return (
    <div 
      className="min-h-screen bg-[#F8FAFC] text-slate-800 flex selection:bg-[#2563EB] selection:text-white"
      style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
    >

      <aside className="w-80 bg-[#0F172A] text-white p-6 flex flex-col justify-between hidden lg:flex select-none shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center font-bold text-white text-base shadow-lg shadow-blue-500/30">
              S
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight block leading-none">
                SmartRecruit
              </span>
              <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase mt-1 block">
                Evaluation Portal
              </span>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Your Profile
            </p>
            <div className="flex items-center space-x-3 bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-xl backdrop-blur-md shadow-inner">
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
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              Assessment Progress
            </p>
            <div className="space-y-2.5">
              
              <div className="p-3.5 bg-blue-600/15 border border-blue-500/30 rounded-xl shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shadow-md shadow-blue-500/30">
                    1
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-400">Instructions</p>
                    <p className="text-[11px] text-slate-300">Review before you begin</p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/30 border border-slate-800 rounded-xl opacity-60">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center border border-slate-700">
                    2
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-300">System check</p>
                    <p className="text-[11px] text-slate-500">Check your setup</p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/30 border border-slate-800 rounded-xl opacity-60">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center border border-slate-700">
                    3
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-300">Assessment overview</p>
                    <p className="text-[11px] text-slate-500">See what's included</p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/30 border border-slate-800 rounded-xl opacity-60">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center border border-slate-700">
                    4
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-300">Assessment</p>
                    <p className="text-[11px] text-slate-500">90 minutes</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-slate-800 relative z-10">
          <div className="p-4 bg-slate-800/60 border border-slate-700/50 rounded-xl">
            <p className="text-xs font-bold text-white mb-1">Need assistance?</p>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              If something isn't clear, our support team is available to assist you.
            </p>
            <a href="#support" className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center space-x-1">
              <span>Contact support</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col justify-between min-h-screen">
        <header className="bg-white/90 border-b border-blue-100 px-8 py-4 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md shadow-sm">
          <div className="text-xs text-slate-500 font-medium flex items-center space-x-2">
            <span>Candidate portal</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">Assessment Preparation</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2.5 bg-[#EFF6FF] border border-blue-100 pl-2 pr-3 py-1 rounded-xl">
              <div className="w-7 h-7 bg-[#2563EB] text-white rounded-lg flex items-center justify-center font-bold text-[10px] shadow-sm">
                {initials}
              </div>
              <span className="text-xs font-semibold text-[#0F172A]">{candidateName}</span>
            </div>
          </div>
        </header>

        <main className="max-w-5xl w-full mx-auto px-6 py-8 flex-grow">

          <div className="mb-8">
            <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-lg border border-blue-200 shadow-sm">
              • BEFORE YOU BEGIN
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] mt-4 tracking-tight">
              Here's what to expect.
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
              Take a minute to get comfortable and check the details below. When you're ready, we'll verify your system configuration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-blue-100 rounded-2xl p-4 flex items-center space-x-3.5 shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:ring-4 hover:ring-blue-500/10">
              <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-[#2563EB] text-base shrink-0">
                <i className="fa-regular fa-clock"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">Time available</p>
                <p className="text-sm font-bold text-[#0F172A] mt-0.5">90 minutes</p>
              </div>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl p-4 flex items-center space-x-3.5 shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:ring-4 hover:ring-blue-500/10">
              <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-[#2563EB] text-base shrink-0">
                <i className="fa-regular fa-folder"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">Question count</p>
                <p className="text-sm font-bold text-[#0F172A] mt-0.5">45 questions</p>
              </div>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl p-4 flex items-center space-x-3.5 shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:ring-4 hover:ring-blue-500/10">
              <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-[#2563EB] text-base shrink-0">
                <i className="fa-solid fa-user-tie"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">Assessment type</p>
                <p className="text-sm font-bold text-[#0F172A] mt-0.5">Technical screening</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <div className="lg:col-span-7 bg-white border border-blue-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:ring-4 hover:ring-blue-500/10">
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-sm font-bold text-[#0F172A]">A few things to prepare</h3>
                  <span className="text-[10px] font-bold text-[#2563EB] tracking-wider uppercase">Please read</span>
                </div>
                <div className="space-y-4">
                
                  <div className="flex items-start space-x-3 text-slate-700 text-xs font-medium">
                    <span className="text-[#2563EB] mt-0.5"><i className="fa-regular fa-circle-check"></i></span>
                    <span className="leading-relaxed">Check that your camera and microphone are working properly.</span>
                  </div>

                  <div className="flex items-start space-x-3 text-slate-700 text-xs font-medium">
                    <span className="text-[#2563EB] mt-0.5"><i className="fa-regular fa-circle-check"></i></span>
                    <span className="leading-relaxed">Set aside about 90 minutes so you can finish uninterrupted.</span>
                  </div>

                  <div className="flex items-start space-x-3 text-slate-700 text-xs font-medium">
                    <span className="text-[#2563EB] mt-0.5"><i className="fa-regular fa-circle-check"></i></span>
                    <span className="leading-relaxed">Read each question carefully before submitting your answer or running test cases.</span>
                  </div>

                  <div className="flex items-start space-x-3 text-slate-700 text-xs font-medium">
                    <span className="text-[#2563EB] mt-0.5"><i className="fa-regular fa-circle-check"></i></span>
                    <span className="leading-relaxed">Keep the window active. Navigating away may log a proctoring notification.</span>
                  </div>

                </div>
              </div>

              <div className="mt-6 p-3.5 bg-[#EFF6FF] border border-blue-100 rounded-xl">
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Find a quiet environment and close unnecessary browser tabs. You'll verify your media setup on the next step.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border border-blue-100 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:ring-4 hover:ring-blue-500/10">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-sm font-bold text-[#0F172A]">What's included</h3>
                <span className="text-[10px] font-bold text-[#2563EB] tracking-wider uppercase">6 Questions</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-[#EFF6FF] border border-blue-100 rounded-xl">
                  <div className="flex items-center space-x-2 text-[#2563EB] text-xs font-bold mb-1">
                    <i className="fa-solid fa-code"></i>
                    <span>Technical questions</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Role-specific questions on DOM performance, async patterns, and state architecture.
                  </p>
                  <p className="text-[10px] font-medium text-[#2563EB] mt-2">Multiple choice</p>
                </div>
                <div className="p-3.5 bg-[#EFF6FF] border border-blue-100 rounded-xl">
                  <div className="flex items-center space-x-2 text-[#2563EB] text-xs font-bold mb-1">
                    <i className="fa-solid fa-desktop"></i>
                    <span>Coding challenge</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Write and run code inside our embedded IDE with live unit test validation.
                  </p>
                  <p className="text-[10px] font-medium text-[#2563EB] mt-2">1 live challenge</p>
                </div>

              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-white border border-blue-100 rounded-2xl mb-8 shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:ring-4 hover:ring-blue-500/10">
            <input
              type="checkbox"
              id="confirm"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#2563EB] bg-white rounded-md border-slate-300 focus:ring-blue-500 cursor-pointer accent-[#2563EB]"
            />
            <label htmlFor="confirm" className="text-xs text-slate-700 font-medium leading-relaxed cursor-pointer select-none">
              I'm in a quiet space, my camera and microphone are ready, and I'll complete the assessment independently without unauthorized assistance.
            </label>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-blue-100 gap-4">
            <p className="text-[11px] text-slate-500">
               Your responses are used to assess your application.
            </p>
            <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-xs font-semibold text-slate-500 hover:text-[#0F172A] transition-colors cursor-pointer bg-transparent border-none"
              >
                Exit assessment
              </button>
              <button
                type="button"
                onClick={handleContinue}
                className={`py-3 px-6 rounded-xl font-bold text-xs transition-all shadow-md flex items-center space-x-2 border-none ${
                  agreed
                    ? "bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white shadow-blue-500/20 cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-60 shadow-none"
                }`}
              >
                <span>Continue to system check</span>
                <span>→</span>
              </button>
            </div>
          </div>

        </main>

        <footer className="py-4 px-8 bg-white border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <p>© SmartRecruit · Secure candidate portal</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#2563EB] transition-colors">Privacy</a>
            <span>·</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#2563EB] transition-colors">Candidate terms</a>
          </div>
        </footer>

      </div>

    </div>
  );
}

export default CandidateInstructions;