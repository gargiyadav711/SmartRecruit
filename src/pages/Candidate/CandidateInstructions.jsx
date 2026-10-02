import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CandidateInstructions() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  function handleContinue() {
    if (!agreed) {
      alert("Please confirm the requirements before proceeding.");
      return;
    }
    navigate("/candidate/system-check");
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

            <div className="flex items-center space-x-2.5 z-10">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-blue-500/20">1</span>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Instructions</span>
            </div>

            <div className="flex-1 border-t border-slate-200 mx-4"></div>

            <div className="flex items-center space-x-2.5 z-10 opacity-70">
              <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 font-semibold text-xs flex items-center justify-center">2</span>
              <span className="text-xs font-medium text-slate-500">Permission check</span>
            </div>

            <div className="flex-1 border-t border-slate-200 mx-4"></div>

            <div className="flex items-center space-x-2.5 z-10 opacity-70">
              <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 font-semibold text-xs flex items-center justify-center">3</span>
              <span className="text-xs font-medium text-slate-500">Assessment overview</span>
            </div>

            <div className="flex-1 border-t border-slate-200 mx-4"></div>

            <div className="flex items-center space-x-2.5 z-10 opacity-70">
              <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 font-semibold text-xs flex items-center justify-center">4</span>
              <span className="text-xs font-medium text-slate-500">Assessment</span>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/80">

          <div className="mb-8">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50/80 px-2.5 py-1 rounded">
              • ASSESSMENT
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
              Frontend Developer Assessment
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Review the instructions before starting your assessment. Ensure your setup is ready and uninterrupted.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

            <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex items-center space-x-3.5">
              <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-blue-600 text-sm">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">30 min</p>
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex items-center space-x-3.5">
              <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-blue-600 text-sm">
                <i className="fa-solid fa-clipboard-list"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Questions</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">6 Questions</p>
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex items-center space-x-3.5">
              <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-blue-600 text-sm">
                <i className="fa-solid fa-chart-bar"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assessment Type</p>
                <p className="text-base font-bold text-slate-900 mt-0.5 truncate max-w-[160px]">Technical Screening</p>
              </div>
            </div>

          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-slate-900">Before you begin</h3>
              <span className="text-xs text-slate-400 font-medium">Mandatory Requirements</span>
            </div>

            <div className="space-y-2.5">

              <div className="flex items-center space-x-3 p-3.5 bg-slate-50/60 border border-slate-100 rounded-xl text-slate-700 text-xs font-medium">
                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  <i className="fa-solid fa-check"></i>
                </span>
                <span>Make sure your camera and microphone are working properly.</span>
              </div>

              <div className="flex items-center space-x-3 p-3.5 bg-slate-50/60 border border-slate-100 rounded-xl text-slate-700 text-xs font-medium">
                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  <i className="fa-solid fa-check"></i>
                </span>
                <span>Complete the assessment within the allotted time without taking breaks.</span>
              </div>

              <div className="flex items-center space-x-3 p-3.5 bg-slate-50/60 border border-slate-100 rounded-xl text-slate-700 text-xs font-medium">
                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  <i className="fa-solid fa-check"></i>
                </span>
                <span>Read each question carefully before responding or executing code.</span>
              </div>

              <div className="flex items-center space-x-3 p-3.5 bg-slate-50/60 border border-slate-100 rounded-xl text-slate-700 text-xs font-medium">
                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  <i className="fa-solid fa-check"></i>
                </span>
                <span>Remain on the assessment screen during the session; leaving full-screen may flag proctoring alerts.</span>
              </div>

            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-900 mb-3">What to expect</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="text-blue-600 font-bold mb-2 text-sm">
                    <i className="fa-solid fa-laptop-code"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">Technical Questions</h4>
                  <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                    Answer role-specific technical questions covering DOM performance, asynchronous patterns, and state architecture.
                  </p>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-slate-600 mt-4 pt-2 border-t border-slate-200/50">
                  <span><i className="fa-regular fa-file-lines"></i></span>
                  <span>Multiple Choice</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="text-blue-600 font-bold mb-2 text-sm">
                    <i className="fa-solid fa-microphone"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">Spoken Response</h4>
                  <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                    Respond to selected scenario questions using your microphone to explain architectural trade-offs.
                  </p>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-slate-600 mt-4 pt-2 border-t border-slate-200/50">
                  <span><i className="fa-solid fa-microphone"></i></span>
                  <span>2 Audio Records</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="text-blue-600 font-bold mb-2 text-sm">
                    <i className="fa-solid fa-desktop"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">Coding Challenge</h4>
                  <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                    Write, compile, and execute your code directly in the embedded Monaco editor against predefined unit tests.
                  </p>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-slate-600 mt-4 pt-2 border-t border-slate-200/50">
                  <span><i className="fa-solid fa-bolt"></i></span>
                  <span>1 Live Challenge</span>
                </div>
              </div>

            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-slate-50/60 border border-slate-200/80 rounded-xl mb-8">
            <input
              type="checkbox"
              id="confirm"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="confirm" className="text-xs text-slate-600 font-medium leading-relaxed cursor-pointer select-none">
              I confirm that I am in a quiet space, my hardware meets the test requirements, and I agree to complete this assessment without unauthorized aids or third-party collaboration.
            </label>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate("/candidate/login")}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Exit Assessment
            </button>

            <button
              type="button"
              onClick={handleContinue}
              className={`py-3 px-6 rounded-xl font-medium text-xs transition-all shadow-sm flex items-center space-x-2 ${
                agreed
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span>Continue to System Check</span>
              <span>→</span>
            </button>
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

export default CandidateInstructions;