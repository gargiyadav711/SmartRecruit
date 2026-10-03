import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CandidateActiveAssessment() {
  const navigate = useNavigate();

  // State for dynamic backend data & interactive toggles
  const [loading, setLoading] = useState(true);
  const [assessmentData, setAssessmentData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Toggle state: "written" or "oral" for the current question
  const [responseMode, setResponseMode] = useState("written");

  // Written answer state
  const [answerText, setAnswerText] = useState("");
  
  // Oral recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState("");

  const [timer, setTimer] = useState(1475); // e.g. 24:35 in seconds

  // 1. Fetch dynamic questions and initial state from ML/Backend on mount
  useEffect(() => {
    async function fetchAssessmentSession() {
      try {
        setLoading(true);
        // Simulated dynamic payload structure coming from your backend/ML model:
        const mockBackendData = {
          candidateId: "SR-94021",
          assessmentTitle: "Frontend Developer Assessment",
          track: "Frontend Fundamentals",
          totalQuestions: 6,
          questions: [
            {
              id: 1,
              type: "TECHNICAL QUESTION",
              category: "Frontend Fundamentals",
              points: 5,
              prompt: "Explain the Virtual DOM reconciliation process in React and how it improves UI rendering performance.",
              instruction: "Keep your answer concise and explain the concept in your own words. Include performance metrics or real-world comparisons where relevant.",
              mlCalibratedTag: "AI Interviewer • Question calibrated for Frontend Developer track",
              allowedModes: ["written", "oral"],
              defaultMode: "written",
              savedAnswer: ""
            },
            {
              id: 2,
              type: "STRUCTURAL EVALUATION",
              stage: "Stage 2. Structured Oral Evaluation",
              sessionId: "#AP1345678",
              category: "Architectural Inquiry",
              maxDuration: "2 min max",
              prompt: "Explain the difference between synchronous and asynchronous JavaScript.",
              instruction: "Answer the question clearly and explain your reasoning. Focus on engine concurrency, execution blocking, and modern syntactical semantics.",
              touchpoints: ["Execution Stack & Event Loop", "Blocking vs Non-blocking I/O", "Promises & async/await"],
              mlCalibratedTag: "AI Assessment Engine • Role-specific architectural inquiry",
              rubricWeight: "Weight :20% of Architecture Score",
              allowedModes: ["written", "oral"],
              defaultMode: "oral",
              savedAnswer: ""
            },
            {
              id: 3,
              type: "TECHNICAL QUESTION",
              category: "State Management",
              points: 5,
              prompt: "What are React Hooks, and what rules must be followed when calling them?",
              instruction: "Describe useState or useEffect use cases alongside the rules of hooks.",
              mlCalibratedTag: "AI Interviewer • Question calibrated for Frontend Developer track",
              allowedModes: ["written", "oral"],
              defaultMode: "written",
              savedAnswer: ""
            }
          ]
        };

        setAssessmentData(mockBackendData);
        const initialQ = mockBackendData.questions[0];
        setResponseMode(initialQ.defaultMode || "written");
        setAnswerText(initialQ.savedAnswer || "");
      } catch (error) {
        console.error("Failed to load dynamic assessment questions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAssessmentSession();
  }, []);

  // Timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Oral recording timer effect
  useEffect(() => {
    let recInterval;
    if (isRecording) {
      recInterval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
        setTranscript(
          "A synchronous model executes tasks sequentially where each operation blocks subsequent code until execution finishes. In contrast, asynchronous execution handles non-blocking I/O operations via the event loop, callback queues, and promises..."
        );
      }, 1000);
    } else {
      clearInterval(recInterval);
    }
    return () => clearInterval(recInterval);
  }, [isRecording]);

  // Format seconds to MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle Navigation between questions
  async function handleNavigation(direction) {
    if (direction === "next") {
      if (assessmentData && currentQuestionIndex < assessmentData.questions.length - 1) {
        const nextIdx = currentQuestionIndex + 1;
        const nextQ = assessmentData.questions[nextIdx];
        setCurrentQuestionIndex(nextIdx);
        setResponseMode(nextQ.defaultMode || "written");
        setAnswerText(nextQ.savedAnswer || "");
        setIsRecording(false);
        setRecordingTime(0);
        setTranscript("");
      } else {
        alert("You have reached the final question. Submit your assessment when ready.");
      }
    } else if (direction === "prev") {
      if (currentQuestionIndex > 0) {
        const prevIdx = currentQuestionIndex - 1;
        const prevQ = assessmentData.questions[prevIdx];
        setCurrentQuestionIndex(prevIdx);
        setResponseMode(prevQ.defaultMode || "written");
        setAnswerText(prevQ.savedAnswer || "");
        setIsRecording(false);
        setRecordingTime(0);
        setTranscript("");
      }
    }
  }

  if (loading || !assessmentData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-bold text-slate-700">Loading dynamic assessment modules...</p>
        </div>
      </div>
    );
  }

  const currentQ = assessmentData.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">

      <header className="bg-white border-b border-slate-200 px-8 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
            <span className="text-lg font-bold text-slate-900 tracking-tight">SmartRecruit</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-sm font-bold text-slate-900">
            {assessmentData.assessmentTitle}
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-1.5">
            {assessmentData.questions.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === currentQuestionIndex ? "bg-blue-600 w-4" : "bg-slate-300"
                } transition-all`}
              ></span>
            ))}
          </div>
          <span className="text-xs font-bold text-slate-700">
            Question {currentQuestionIndex + 1} of {assessmentData.questions.length}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-800">
            <i className="fa-regular fa-clock text-blue-600"></i>
            <span>{formatTime(timer)}</span>
          </div>

          <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm">
              👤
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-slate-900 leading-tight">Priya Tiwari</p>
              <p className="text-[10px] text-slate-400 font-medium">candidate</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto px-4 py-8 flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded">
                  {responseMode === "oral" ? "AI INTERVIEW" : currentQ.type}
                </span>
                {responseMode === "oral" && currentQ.sessionId && (
                  <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                    Session id- {currentQ.sessionId}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="text-slate-500 font-medium">{responseMode === "oral" ? currentQ.maxDuration : currentQ.category}</span>
                <span className="text-slate-300">|</span>
                <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {responseMode === "oral" ? "Architectural Inquiry" : `${currentQ.points} Pts`}
                </span>
              </div>
            </div>

            {responseMode === "oral" && currentQ.stage && (
              <p className="text-[11px] font-bold text-blue-600 mb-2 uppercase tracking-wide">
                {currentQ.stage}
              </p>
            )}

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              "{currentQ.prompt}"
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
              {currentQ.instruction}
            </p>

            {responseMode === "oral" && currentQ.touchpoints && (
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 mr-2">Recommended touchpoints:</span>
                {currentQ.touchpoints.map((tp, i) => (
                  <span key={i} className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>{tp}</span>
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-2 text-[11px] text-slate-400 font-medium">
              <i className="fa-solid fa-wand-magic-sparkles text-blue-500"></i>
              <span>{currentQ.mlCalibratedTag}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-2 shadow-sm border border-slate-200/80 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 pl-3">Select Response Format:</span>
            <div className="flex bg-slate-100 p-1 rounded-lg space-x-1">
              <button
                onClick={() => setResponseMode("written")}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  responseMode === "written"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <i className="fa-solid fa-pen-to-square mr-1.5"></i> Written Answer
              </button>
              <button
                onClick={() => setResponseMode("oral")}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  responseMode === "oral"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <i className="fa-solid fa-microphone mr-1.5"></i> Oral Evaluation
              </button>
            </div>
          </div>

          {responseMode === "oral" ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Your Oral Response</h3>
                  <p className="text-slate-500 text-xs mt-0.5">Speak clearly and naturally. High-fidelity audio is processed for analysis.</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>Microphone connected. 48kHz</span>
                </span>
              </div>

              <div className="flex flex-col items-center justify-center py-6 bg-slate-50/70 border border-slate-200/80 rounded-2xl space-y-4">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-20 h-20 rounded-full flex flex-col items-center justify-center text-white shadow-lg transition-all cursor-pointer ${
                    isRecording ? "bg-red-600 hover:bg-red-700 shadow-red-500/30 animate-pulse" : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/30"
                  }`}
                >
                  <i className={`fa-solid ${isRecording ? "fa-stop" : "fa-microphone"} text-xl mb-1`}></i>
                  <span className="text-[10px] font-bold tracking-wider">{isRecording ? "STOP" : "START"}</span>
                </button>

                <div className="h-12 bg-white border border-slate-200 rounded-xl px-4 flex items-center justify-between space-x-1.5 shadow-sm w-full max-w-md">
                  <div className="w-1.5 h-3 bg-blue-500 rounded-full"></div>
                  <div className={`w-1.5 h-6 bg-blue-500 rounded-full ${isRecording ? "animate-bounce" : ""}`}></div>
                  <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
                  <div className={`w-1.5 h-8 bg-blue-600 rounded-full ${isRecording ? "animate-pulse" : ""}`}></div>
                  <div className="w-1.5 h-5 bg-blue-500 rounded-full"></div>
                  <div className={`w-1.5 h-10 bg-blue-600 rounded-full ${isRecording ? "animate-bounce" : ""}`}></div>
                  <div className="w-1.5 h-7 bg-blue-500 rounded-full"></div>
                  <div className={`w-1.5 h-9 bg-blue-600 rounded-full ${isRecording ? "animate-pulse" : ""}`}></div>
                  <div className="w-1.5 h-4 bg-blue-400 rounded-full"></div>
                  <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                  <div className="w-1.5 h-3 bg-slate-300 rounded-full"></div>
                  <div className="w-1.5 h-2 bg-slate-200 rounded-full"></div>
                </div>

                <div className="flex items-center space-x-4 text-xs font-mono text-slate-500">
                  <span>Press the button when ready to record</span>
                  <span>•</span>
                  <span className="font-bold text-slate-800">{formatTime(recordingTime)} / 2 min cap</span>
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px] font-sans font-bold">optimal input</span>
                </div>
              </div>

              <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                    <i className="fa-regular fa-closed-captioning text-blue-600"></i>
                    <span>Live Speech-to-Text Transcription</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[11px]">
                    <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">WHISPER AI</span>
                    <label className="flex items-center space-x-1.5 text-slate-600 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      <span>Show live captions</span>
                    </label>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-700 min-h-[80px] leading-relaxed shadow-inner">
                  {transcript || "Your spoken response will appear here in real-time as you formulate your thoughts...."}
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                <i className="fa-solid fa-lock text-blue-600"></i>
                <span>Audio is encrypted in transit and securely evaluated against rubric benchmarks.</span>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                    <span>Your Written Answer</span>
                    <span className="text-[10px] font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded">PLAIN TEXT</span>
                  </span>
                  <div className="flex items-center space-x-2 text-slate-400 text-xs">
                    <i className="fa-solid fa-list-ul hover:text-slate-700 cursor-pointer"></i>
                    <i className="fa-solid fa-code hover:text-slate-700 cursor-pointer"></i>
                    <i className="fa-solid fa-expand hover:text-slate-700 cursor-pointer"></i>
                  </div>
                </div>

                <textarea
                  rows="8"
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Type your structured answer here..."
                  className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-sans focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 leading-relaxed shadow-inner resize-y"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400 gap-2">
                <div className="flex items-center space-x-4">
                  <button onClick={() => setAnswerText("")} className="hover:text-slate-700 transition-colors flex items-center space-x-1 cursor-pointer">
                    <i className="fa-solid fa-rotate-right text-[10px]"></i>
                    <span>Clear answer</span>
                  </button>
                  <span className="flex items-center space-x-1 text-emerald-600 font-medium">
                    <i className="fa-solid fa-cloud text-[10px]"></i>
                    <span>Auto-saves every 5 seconds</span>
                  </span>
                </div>
                <span className="font-mono">{answerText.length} / 1000</span>
              </div>
            </div>
          )}

        </div>

        <div className="space-y-6">

          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm">
            <div className="flex justify-between items-center text-white mb-3">
              <span className="text-xs font-semibold flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                <span>Camera active</span>
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">720p HD</span>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-slate-950 h-48 flex items-center justify-center border border-slate-800">
              <div className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded flex items-center space-x-1">
                <i className="fa-solid fa-wifi text-[8px]"></i>
                <span>Stable</span>
              </div>

              <div className="flex flex-col items-center justify-center text-slate-600">
                <i className="fa-solid fa-user-circle text-5xl text-slate-700"></i>
                <p className="text-[11px] text-slate-500 mt-1">Proctor AI Active</p>
              </div>

              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] text-slate-300 bg-black/50 px-2 py-1 rounded">
                <span>Camera active • Encrypted</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Video encrypted for candidate review</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <i className="fa-solid fa-lightbulb text-blue-600"></i>
              <span>{responseMode === "oral" ? "Speaking Tips" : "Assessment Tips"}</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              {responseMode === "oral" ? (
                <>
                  <div className="flex items-start space-x-2.5">
                    <i className="fa-solid fa-check text-emerald-600 mt-0.5"></i>
                    <span>Structure your thought (context, implementation, edge-case) before beginning.</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <i className="fa-regular fa-clock text-blue-600 mt-0.5"></i>
                    <span>Maintain an even, conversational pace; the AI focuses on technical depth and reasoning.</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start space-x-2.5">
                    <i className="fa-solid fa-check text-emerald-600 mt-0.5"></i>
                    <span>Focus on clarity and real-world examples from actual frontend projects.</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <i className="fa-regular fa-clock text-blue-600 mt-0.5"></i>
                    <span>The assessment timer runs continuously across questions.</span>
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <a href="#" className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center space-x-1">
                <span>Audio & Video Hardware Settings</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center space-x-2.5 text-xs font-semibold text-slate-700">
              <i className="fa-solid fa-clipboard-check text-blue-600"></i>
              <div>
                <p className="font-bold text-slate-900">Assessment Rubric</p>
                <p className="text-[10px] text-slate-400">{responseMode === "oral" ? "Weight :20% of Architecture Score" : "Standard Question Weight"}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
              Active
            </span>
          </div>

        </div>

      </main>

      <footer className="bg-white border-t border-slate-200 px-8 py-4 flex flex-col sm:flex-row items-center justify-between text-xs sticky bottom-0 z-20 shadow-md">
        <div className="flex items-center space-x-2 text-slate-500 mb-2 sm:mb-0">
          <span className="font-bold text-slate-800">Question {currentQuestionIndex + 1} of {assessmentData.questions.length}</span>
          <span>•</span>
          <span>{responseMode === "oral" ? "Oral Evaluation Section" : "Technical Section"}</span>
        </div>

        <div className="flex items-center space-x-2 text-emerald-600 font-medium mb-2 sm:mb-0">
          <i className="fa-solid fa-cloud-arrow-up"></i>
          <span>Answer saved automatically</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => handleNavigation("prev")}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 rounded-xl font-semibold border border-slate-200 transition-colors flex items-center space-x-1.5 ${
              currentQuestionIndex === 0 ? "opacity-50 cursor-not-allowed bg-slate-100 text-slate-400" : "bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
            }`}
          >
            <span>←</span>
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavigation("next")}
            className="px-5 py-2 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <span>Next Question</span>
            <span>→</span>
          </button>
        </div>
      </footer>

    </div>
  );
}

export default CandidateActiveAssessment;