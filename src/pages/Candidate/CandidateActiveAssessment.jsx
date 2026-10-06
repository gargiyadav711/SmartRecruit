import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function CandidateActiveAssessment() {
  const navigate = useNavigate();

  // State for dynamic backend data & interactive toggles
  const [loading, setLoading] = useState(true);
  const [assessmentData, setAssessmentData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  
  // Selected option state for current question
  const [selectedOption, setSelectedOption] = useState(null);

  // Timer set to 90 minutes (90 * 60 = 5400 seconds)
  const [timer, setTimer] = useState(5400);

  // --- CAMERA STREAM & PROCTORING STATES ---
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");

  // --- TAB SWITCH / PROCTORING WARNING STATES ---
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [submittedModalOpen, setSubmittedModalOpen] = useState(false);

  // 1. Initialize Camera Stream on Mount
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
      } catch (err) {
        console.error("Camera access denied or unavailable:", err);
        setCameraError("Camera access denied or not available. Please allow camera permissions.");
        setCameraActive(false);
      }
    }

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // 2. Tab Switch Counter & Visibility Handler
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        setTabSwitchCount((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount === 1 || newCount === 2) {
            setWarningModalOpen(true);
          } else if (newCount >= 3) {
            setSubmittedModalOpen(true);
            if (videoRef.current && videoRef.current.srcObject) {
              const tracks = videoRef.current.srcObject.getTracks();
              tracks.forEach(track => track.stop());
            }
          }
          return newCount;
        });
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // 3. Fetch dynamic questions on mount (Total 4 questions)
  useEffect(() => {
    async function fetchAssessmentSession() {
      try {
        setLoading(true);
        const mockBackendData = {
          candidateId: "SR-94021",
          assessmentTitle: "Frontend Developer Assessment",
          track: "Frontend Fundamentals",
          totalQuestions: 4,
          questions: [
            {
              id: 1,
              type: "TECHNICAL QUESTION",
              category: "Frontend fundamentals",
              points: 5,
              prompt: "Which of the following best describes the primary purpose of React's Virtual DOM?",
              instruction: "Choose an option below and click Save or Skip.",
              mlCalibratedTag: "AI Interviewer • Question calibrated for Frontend Developer track",
              options: [
                { id: "A", title: "To directly manipulate browser DOM nodes", desc: "It replaces native browser APIs entirely to handle styling changes." },
                { id: "B", title: "To minimize direct, costly DOM manipulations by batching diffs", desc: "It maintains an in-memory representation and updates only what changed." },
                { id: "C", title: "To store persistent application data locally", desc: "It functions similarly to browser LocalStorage or IndexedDB." },
                { id: "D", title: "To encrypt client-server API communications", desc: "It secures data payloads before they are sent over HTTPS." }
              ],
              status: "unattempted", // 'saved', 'skipped', 'unattempted'
              savedAnswer: null
            },
            {
              id: 2,
              type: "TECHNICAL QUESTION",
              category: "Frontend fundamentals",
              points: 5,
              prompt: "Which statement best describes a REST API and the GET and POST methods?",
              instruction: "Choose an option below and click Save or Skip.",
              mlCalibratedTag: "Frontend Developer track • Question 2",
              options: [
                { id: "A", title: "REST APIs use HTTP for client-server communication.", desc: "GET is commonly used to retrieve a resource; POST sends data to the server, often to create a resource." },
                { id: "B", title: "REST APIs require every request to depend on the previous one.", desc: "GET changes server data, while POST is reserved for reading resources without side effects." },
                { id: "C", title: "REST is a browser rendering standard.", desc: "GET and POST are methods used only to control how a page is styled and displayed." },
                { id: "D", title: "REST APIs communicate only through a persistent WebSocket connection.", desc: "GET and POST are not part of the HTTP request-response model." }
              ],
              status: "unattempted",
              savedAnswer: null
            },
            {
              id: 3,
              type: "TECHNICAL QUESTION",
              category: "State Management",
              points: 5,
              prompt: "What is a primary rule that must be followed when calling React Hooks?",
              instruction: "Choose an option below and click Save or Skip.",
              mlCalibratedTag: "AI Interviewer • Question calibrated for Frontend Developer track",
              options: [
                { id: "A", title: "Call them inside loops and conditional statements.", desc: "Hooks can be executed dynamically based on runtime state checks." },
                { id: "B", title: "Call them only at the top level of your React function components.", desc: "Never call hooks inside loops, conditions, or nested functions to ensure hook order consistency." },
                { id: "C", title: "Call them exclusively inside traditional class component methods.", desc: "Hooks were designed to replace lifecycle methods inside class components only." },
                { id: "D", title: "Call them only from external utility JavaScript files.", desc: "Hooks cannot access React component context unless invoked globally." }
              ],
              status: "unattempted",
              savedAnswer: null
            },
            {
              id: 4,
              type: "TECHNICAL QUESTION",
              category: "Hooks & Lifecycle",
              points: 5,
              prompt: "When does the cleanup function returned inside a React `useEffect` hook execute?",
              instruction: "Choose an option below and click Save or Skip.",
              mlCalibratedTag: "AI Interviewer • Question calibrated for Frontend Developer track",
              options: [
                { id: "A", title: "Only when the browser window is closed or refreshed.", desc: "Cleanup routines persist until the entire user session terminates." },
                { id: "B", title: "Before the component is unmounted and before running the effect on subsequent renders.", desc: "It prevents memory leaks by cleaning up previous subscriptions or timers." },
                { id: "C", title: "Immediately upon initial component mount before render.", desc: "It executes prior to DOM element creation." },
                { id: "D", title: "Only when an unhandled JavaScript exception occurs.", desc: "It acts as a global error boundary catch mechanism." }
              ],
              status: "unattempted",
              savedAnswer: null
            }
          ]
        };

        setAssessmentData(mockBackendData);
        setSelectedOption(mockBackendData.questions[0].savedAnswer);
      } catch (error) {
        console.error("Failed to load dynamic assessment questions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAssessmentSession();
  }, []);

  // Sync selectedOption whenever currentQuestionIndex changes
  useEffect(() => {
    if (assessmentData && assessmentData.questions[currentQuestionIndex]) {
      setSelectedOption(assessmentData.questions[currentQuestionIndex].savedAnswer);
    }
  }, [currentQuestionIndex, assessmentData]);

  // Timer countdown effect & auto-submit on 0
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSubmittedModalOpen(true);
          if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // --- SAVE OPTION HANDLER ---
  const handleSaveAnswer = () => {
    if (!assessmentData) return;
    const updatedQuestions = [...assessmentData.questions];
    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      status: "saved",
      savedAnswer: selectedOption !== null ? selectedOption : (updatedQuestions[currentQuestionIndex].savedAnswer || "A")
    };
    if (selectedOption === null && !updatedQuestions[currentQuestionIndex].savedAnswer) {
      updatedQuestions[currentQuestionIndex].savedAnswer = "A";
      setSelectedOption("A");
    }
    setAssessmentData({ ...assessmentData, questions: updatedQuestions });
  };

  // --- SKIP OPTION HANDLER ---
  const handleSkipQuestion = () => {
    if (!assessmentData) return;
    const updatedQuestions = [...assessmentData.questions];
    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      status: "skipped"
    };
    setAssessmentData({ ...assessmentData, questions: updatedQuestions });
    
    // Auto advance to next question if available
    if (currentQuestionIndex < assessmentData.questions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      setSelectedOption(assessmentData.questions[nextIdx].savedAnswer);
    }
  };

  // Navigation handlers
  const handleNavigation = (direction) => {
    if (direction === "next") {
      if (assessmentData && currentQuestionIndex < assessmentData.questions.length - 1) {
        const nextIdx = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIdx);
        setSelectedOption(assessmentData.questions[nextIdx].savedAnswer);
      } else {
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }
        setSubmittedModalOpen(true);
      }
    } else if (direction === "prev") {
      if (currentQuestionIndex > 0) {
        const prevIdx = currentQuestionIndex - 1;
        setCurrentQuestionIndex(prevIdx);
        setSelectedOption(assessmentData.questions[prevIdx].savedAnswer);
      }
    }
  };

  if (loading || !assessmentData) {
    return (
      <div className="min-h-screen bg-[#060F0A] flex items-center justify-center font-sans text-white">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-bold text-slate-300">Loading dynamic assessment modules...</p>
        </div>
      </div>
    );
  }

  const currentQ = assessmentData.questions[currentQuestionIndex];

  // Calculate stats for overall progress & breakdown box
  const totalQCount = assessmentData.questions.length;
  const savedCount = assessmentData.questions.filter(q => q.status === "saved").length;
  const skippedCount = assessmentData.questions.filter(q => q.status === "skipped").length;
  const unattemptedCount = assessmentData.questions.filter(q => q.status === "unattempted").length;
  const progressPercentage = Math.round((savedCount / totalQCount) * 100);

  return (
    <div className="min-h-screen bg-[#060F0A] text-slate-100 flex flex-col justify-between font-sans selection:bg-emerald-600 selection:text-white relative">

      {/* Warning Modal for 1st and 2nd Tab Switch */}
      {warningModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#09160E] border border-amber-500/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-3 text-amber-400">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-lg">
                ⚠
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Proctoring Warning ({tabSwitchCount}/3)</h3>
                <p className="text-xs text-amber-400/90">Tab switching detected!</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Leaving the assessment tab is strictly prohibited and monitored. If you switch tabs <strong className="text-white">3 times</strong>, your assessment will be <strong className="text-red-400">automatically submitted</strong>.
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setWarningModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
              >
                I Understand, Return to Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auto-Submitted Modal on 3rd Tab Switch or Final Completion */}
      {submittedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#09160E] border border-emerald-900/50 rounded-2xl max-w-md w-full p-6 space-y-4 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Assessment Submitted</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {tabSwitchCount >= 3 
                ? "Your assessment has been automatically submitted due to multiple tab switch violations."
                : timer === 0
                ? "Your 90-minute assessment time has expired. Your responses have been submitted automatically."
                : `Your assessment has been successfully completed and recorded. Saved: ${savedCount}, Skipped: ${skippedCount}. Camera access has been securely terminated.`}
            </p>
            <div className="pt-4">
              <button
                onClick={() => navigate("/")}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="bg-[#09160E] border-b border-emerald-900/30 px-6 py-3.5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
              S
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">SmartRecruit</h1>
              <p className="text-[9px] font-bold text-emerald-500/70 tracking-wider uppercase">ASSESSMENT SESSION</p>
            </div>
          </div>
        </div>

        <div className="text-sm font-semibold text-slate-200">
          {assessmentData.assessmentTitle}
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-1.5 text-xs text-slate-400">
            <span>● ● ●</span>
            <span className="ml-2 font-medium text-slate-300">Question {currentQuestionIndex + 1} of {totalQCount}</span>
          </div>

          <div className="flex items-center space-x-2 bg-[#0D1D13] border border-emerald-950 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-100">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{formatTime(timer)}</span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="max-w-[1400px] w-full mx-auto px-6 py-6 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Sidebar Navigation & Candidate Info */}
        <aside className="lg:col-span-3 space-y-6">
          
          {/* Candidate Card */}
          <div className="bg-[#09160E] border border-emerald-900/30 rounded-2xl p-4">
            <p className="text-[10px] font-bold text-emerald-500/60 tracking-wider uppercase mb-3">CANDIDATE</p>
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-sm">
                YN
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-tight">Your Name</p>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-[#09160E] border border-emerald-900/30 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-emerald-500/60 tracking-wider uppercase">Overall progress</span>
              <span className="text-xs font-bold text-white">{savedCount} of {totalQCount} saved ({progressPercentage}%)</span>
            </div>
            <div className="w-full bg-[#0D1D13] h-1.5 rounded-full overflow-hidden mb-3">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-400">Successfully saved responses</p>
          </div>

          {/* Technical Questions Nav List (Color-coded based on status) */}
          <div className="bg-[#09160E] border border-emerald-900/30 rounded-2xl p-4">
            <p className="text-[10px] font-bold text-emerald-500/60 tracking-wider uppercase mb-3">TECHNICAL QUESTIONS (4)</p>
            <div className="grid grid-cols-4 gap-2">
              {assessmentData.questions.map((q, idx) => {
                const isCurrent = currentQuestionIndex === idx;
                
                // Determine styling based on status
                let buttonStyle = "bg-[#0D1D13] border border-emerald-900/40 text-slate-400 hover:border-emerald-500";
                if (q.status === "saved") {
                  buttonStyle = "bg-emerald-600/20 border border-emerald-500 text-emerald-300 font-bold shadow-sm";
                } else if (q.status === "skipped") {
                  buttonStyle = "bg-amber-500/20 border border-amber-500/60 text-amber-300 font-bold";
                }

                if (isCurrent) {
                  buttonStyle += " ring-2 ring-emerald-400";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-10 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${buttonStyle}`}
                    title={`Q${idx + 1}: ${q.status}`}
                  >
                    {q.status === "saved" ? "✓ " + (idx + 1) : idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Question Status Legend / Details Box */}
            <div className="mt-4 pt-3 border-t border-emerald-950 space-y-1.5 text-[11px] text-slate-300">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span><span>Saved:</span></span>
                <span className="font-bold text-emerald-400">{savedCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span><span>Skipped:</span></span>
                <span className="font-bold text-amber-400">{skippedCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-slate-600"></span><span>Unattempted:</span></span>
                <span className="font-bold text-slate-300">{unattemptedCount}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Central Question & Answer Area */}
        <main className="lg:col-span-6 space-y-6">

          {/* Question Box */}
          <div className="bg-[#09160E] border border-emerald-900/30 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
                  {currentQ.type}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  currentQ.status === 'saved' ? 'bg-emerald-500/20 text-emerald-300' :
                  currentQ.status === 'skipped' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  Status: {currentQ.status}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span>{currentQ.category}</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">{currentQ.points} pts</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
              {currentQ.prompt}
            </h2>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              {currentQ.instruction}
            </p>

            <div className="mt-4 pt-3 border-t border-emerald-950 text-[11px] text-slate-500">
              {currentQ.mlCalibratedTag}
            </div>
          </div>

          {/* Answer Options Section */}
          <div className="bg-[#09160E] border border-emerald-900/30 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Your answer</span>
              <span className="text-[10px] font-bold text-emerald-500/70 tracking-wider">SELECT ONE</span>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start space-x-3.5 ${
                      isSelected 
                        ? "bg-[#0D1D13] border-emerald-500 shadow-md shadow-emerald-950" 
                        : "bg-[#060F0A] border-emerald-950 hover:border-emerald-800/60"
                    }`}
                  >
                    <div className="mt-0.5">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold ${
                        isSelected ? "border-emerald-400 bg-emerald-500/20 text-emerald-300" : "border-slate-600 text-slate-500"
                      }`}>
                        {opt.id}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-snug">{opt.title}</p>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{opt.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SAVE & SKIP ACTION BUTTONS */}
            <div className="pt-4 mt-2 border-t border-emerald-950 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {currentQ.status === "saved" ? <span className="text-emerald-400 font-semibold">✓ Response saved successfully</span> : "Select an option and save or skip."}
              </span>
              
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleSkipQuestion}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all cursor-pointer"
                >
                  Skip Question
                </button>

                <button
                  type="button"
                  onClick={handleSaveAnswer}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  Save Answer
                </button>
              </div>
            </div>

          </div>

        </main>

        {/* Right Sidebar: Active Live Camera Feed & Tips */}
        <aside className="lg:col-span-3 space-y-6">

          {/* Live Camera Card */}
          <div className="bg-[#09160E] border border-emerald-900/30 rounded-2xl p-4">
            <div className="flex justify-between items-center text-white mb-3">
              <span className="text-xs font-semibold flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${cameraActive ? "bg-emerald-400 animate-pulse" : "bg-red-500"}`}></span>
                <span>{cameraActive ? "Camera active" : "Camera inactive"}</span>
              </span>
              <span className="text-[10px] bg-[#0D1D13] border border-emerald-950 text-slate-300 px-2 py-0.5 rounded font-mono">720p HD</span>
            </div>

            {/* Live Video Element */}
            <div className="relative rounded-xl overflow-hidden bg-[#060F0A] h-44 flex items-center justify-center border border-emerald-950">
              {cameraError ? (
                <div className="p-3 text-center text-xs text-red-400">
                  {cameraError}
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
              )}

              <div className="absolute top-2 right-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded flex items-center space-x-1">
                <span>Wi-Fi</span>
                <span>Stable</span>
              </div>

              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] text-slate-400 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                <span>Proctored feed</span>
                <span>Encrypted</span>
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center space-x-1">
                <span className="text-emerald-500">🛡️</span>
                <span>Tab Switches: <strong className="text-white">{tabSwitchCount}/3</strong></span>
              </span>
              <span>Proctored session</span>
            </div>
          </div>

          {/* Assessment Tips Card */}
          <div className="bg-[#09160E] border border-emerald-900/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Assessment tips</h3>
            <div className="space-y-2.5 text-xs text-slate-400 leading-relaxed">
              <p>• You have 4 questions and 90 minutes total.</p>
              <p>• Click <strong className="text-emerald-400">Save Answer</strong> after selecting your choice.</p>
              <p>• Click <strong className="text-amber-400">Skip Question</strong> to jump past items.</p>
              <p>• Avoid switching tabs to prevent auto-submission.</p>
            </div>
          </div>

        </aside>

      </div>

      {/* Bottom Sticky Action Footer */}
      <footer className="bg-[#09160E] border-t border-emerald-900/30 px-8 py-4 flex flex-col sm:flex-row items-center justify-between text-xs sticky bottom-0 z-20">
        <div className="flex items-center space-x-3 text-slate-400 mb-2 sm:mb-0">
          <span className="font-bold text-white">Question {currentQuestionIndex + 1} of {totalQCount}</span>
          <span>•</span>
          <span>Saved: {savedCount} | Skipped: {skippedCount} | Unattempted: {unattemptedCount}</span>
        </div>

        <div className="flex items-center space-x-2 text-emerald-400 font-medium mb-2 sm:mb-0">
          <span>✓</span>
          <span>Total Questions: 4</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => handleNavigation("prev")}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 rounded-xl font-semibold border border-emerald-900/40 transition-colors flex items-center space-x-1.5 ${
              currentQuestionIndex === 0 ? "opacity-50 cursor-not-allowed bg-[#0D1D13] text-slate-500" : "bg-[#0D1D13] text-slate-300 hover:bg-emerald-950 cursor-pointer"
            }`}
          >
            <span>←</span>
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavigation("next")}
            className="px-5 py-2 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <span>{currentQuestionIndex === totalQCount - 1 ? "Submit assessment" : "Next question"}</span>
            <span>→</span>
          </button>
        </div>
      </footer>

    </div>
  );
}

export default CandidateActiveAssessment;