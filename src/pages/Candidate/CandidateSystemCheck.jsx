import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CandidateSystemCheck() {
  const navigate = useNavigate();
  const [allPassed, setAllPassed] = useState(true);

  function handleContinue() {
    navigate("/candidate/assessment-overview");
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

            <div className="flex items-center space-x-2.5 z-10">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-blue-500/20">2</span>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Permission check</span>
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

          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50/80 px-2.5 py-1 rounded">
                • STEP 2 OF 4 • SETUP
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
                Let’s check your setup
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                We’ll quickly verify the necessary permissions, peripheral latency, and bandwidth before entering the assessment room.
              </p>
            </div>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <i className="fa-solid fa-shield-halved mr-1.5 text-blue-600"></i> Secure Evaluation Proctor v4.1
            </span>
          </div>

          <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 bg-white shadow-sm border border-slate-200 rounded-xl flex items-center justify-center text-blue-600">
                <i className="fa-solid fa-video"></i>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-slate-900 text-sm">Camera</h4>
                  <i className="fa-solid fa-circle-check text-emerald-600 text-xs"></i>
                </div>
                <p className="text-slate-500 text-xs mt-0.5">Camera ready (Logitech HD Pro C920)</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer">
                Change Device
              </button>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg flex items-center space-x-1">
                <i className="fa-solid fa-check text-[10px]"></i> <span>Verified</span>
              </span>
            </div>
          </div>

          <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 bg-white shadow-sm border border-slate-200 rounded-xl flex items-center justify-center text-blue-600">
                <i className="fa-solid fa-microphone"></i>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-slate-900 text-sm">Microphone</h4>
                  <i className="fa-solid fa-circle-check text-emerald-600 text-xs"></i>
                </div>
                <p className="text-slate-500 text-xs mt-0.5">Microphone ready (MacBook Pro Studio Mic)</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer">
                Calibrate
              </button>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg flex items-center space-x-1">
                <i className="fa-solid fa-check text-[10px]"></i> <span>Verified</span>
              </span>
            </div>
          </div>

          <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 bg-white shadow-sm border border-slate-200 rounded-xl flex items-center justify-center text-blue-600">
                <i className="fa-solid fa-wifi"></i>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-slate-900 text-sm">Browser & Connection</h4>
                </div>
                <p className="text-slate-500 text-xs mt-0.5">Chrome 122 • High-speed stable connection (38 Mbps, 14ms latency)</p>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg flex items-center space-x-1">
                <i className="fa-solid fa-bolt text-[10px]"></i> <span>Ready</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

            <div className="bg-slate-900 rounded-2xl p-4 flex flex-col justify-between border border-slate-800 shadow-inner">
              <div className="flex justify-between items-center text-white mb-3">
                <span className="text-xs font-semibold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span>Camera Preview</span>
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">720p HD • 30 FPS</span>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-slate-950 h-56 flex items-center justify-center border border-slate-800">
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-mono border border-white/10 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  <span>PROCTOR FEED #01</span>
                </div>

                <div className="absolute top-3 right-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] px-2 py-1 rounded flex items-center space-x-1">
                  <i className="fa-solid fa-expand text-[9px]"></i>
                  <span>Target Locked</span>
                </div>

                <div className="flex flex-col items-center justify-center text-slate-600">
                  <i className="fa-solid fa-user-circle text-6xl text-slate-700"></i>
                  <p className="text-xs text-slate-500 mt-2">Live Video Stream Active</p>
                </div>

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col space-y-1.5 opacity-60">
                  <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                  <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
                  <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
                  <div className="w-1.5 h-3 bg-yellow-500 rounded-full"></div>
                </div>

                <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-[10px] text-slate-300 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/5">
                  <span>🔒 Facial framing detected • Good lighting</span>
                  <span className="text-emerald-400 font-medium">🛡️ Encrypted</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-3 flex items-center space-x-1.5">
                <i className="fa-solid fa-circle-info text-blue-400"></i>
                <span>Make sure your face is clearly visible and centered in the frame.</span>
              </p>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-slate-900 text-sm">Microphone Test</h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                    <span>Active</span>
                  </span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Speak naturally into your device to verify continuous audio gain and background noise suppression.
                </p>

                <div className="mt-4">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Audio Input Source</label>
                  <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm cursor-pointer">
                    <span>Default - MacBook Pro Microphone</span>
                    <i className="fa-solid fa-chevron-down text-slate-400 text-[10px]"></i>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Input Level Meter</span>
                    <span className="text-[11px] font-bold text-emerald-600">Normal • Good Clarity</span>
                  </div>

                  <div className="h-12 bg-white border border-slate-200 rounded-xl px-3 flex items-center justify-between space-x-1.5 shadow-sm">
                    <div className="w-1.5 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                    <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
                    <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                    <div className="w-1.5 h-5 bg-blue-500 rounded-full"></div>
                    <div className="w-1.5 h-10 bg-blue-600 rounded-full"></div>
                    <div className="w-1.5 h-7 bg-blue-500 rounded-full"></div>
                    <div className="w-1.5 h-9 bg-blue-600 rounded-full"></div>
                    <div className="w-1.5 h-4 bg-blue-400 rounded-full"></div>
                    <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                    <div className="w-1.5 h-3 bg-slate-300 rounded-full"></div>
                    <div className="w-1.5 h-2 bg-slate-200 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                  <i className="fa-solid fa-volume-high text-blue-600"></i>
                  <span>Speaker Playback</span>
                </div>
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer">
                  <i className="fa-solid fa-play text-[10px]"></i>
                  <span>Test Sound</span>
                </button>
              </div>

              <p className="text-[10px] text-slate-400 mt-3">
                All sound feedback and echo cancellation system are on .
              </p>
            </div>

          </div>

          <div className="flex items-start space-x-3 p-4 bg-slate-50/80 border border-slate-200 rounded-xl mb-8 text-xs text-slate-600 leading-relaxed">
            <i className="fa-solid fa-shield-halved text-blue-600 mt-0.5"></i>
            <div>
              Your camera and microphone stream will be monitored during the coding and technical challenge steps to verify identity. All biometric and proctoring logs are securely encrypted at rest under SOC 2 Type II and GDPR enterprise criteria. <a href="#" className="text-blue-600 font-semibold hover:underline">View Candidate Privacy Agreement <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i></a>
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate("/candidate/instructions")}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <span>←</span>
              <span>Back to Instructions</span>
            </button>

            <div className="flex items-center space-x-4">
              <span className="text-xs font-medium text-slate-600 flex items-center space-x-1.5">
                <i className="fa-solid fa-circle-check text-emerald-600"></i>
                <span>All 3 system checks passed</span>
              </span>

              <button
                type="button"
                onClick={handleContinue}
                className="py-3 px-6 rounded-xl font-medium text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Continue to Assessment</span>
                <span>→</span>
              </button>
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

export default CandidateSystemCheck;