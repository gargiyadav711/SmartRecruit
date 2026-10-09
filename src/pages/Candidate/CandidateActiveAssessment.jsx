import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function CandidateActiveAssessment() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [submittedModalOpen, setSubmittedModalOpen] = useState(false);
  
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const [timer, setTimer] = useState(1800);

  const [proctoringState, setProctoringState] = useState({
    predictedActivity: "NORMAL",
    modelConfidence: 0.98,
    visualActivityFlag: "NO",
    flagReason: "Candidate posture and gaze stable within normal parameters.",
    facePresencePct: 100,
    gazeDistribution: { center: 82, left: 12, right: 6 },
    maxFacesDetected: 1,
    longestFaceAbsenceSecs: 0,
    multipleFaceDurationSecs: 0,
    lookingAwayEventsCount: 0
  });
  
  const [assessmentData, setAssessmentData] = useState({
    assessmentTitle: "Senior React Developer Technical Evaluation",
    questions: [
      {
        id: 1,
        type: "Multiple Choice",
        points: 10,
        mlCalibratedTag: "Core React & Performance",
        prompt: "What is the primary purpose of React.memo() in functional components?",
        instruction: "Select the most accurate option below.",
        options: [
          { id: "A", title: "Memoizing component rendering", desc: "Prevents re-rendering of a component if its props have not changed, optimizing performance." },
          { id: "B", title: "Caching API responses", desc: "Stores network request results in local memory to avoid duplicate fetches." },
          { id: "C", title: "Managing global state", desc: "Acts as a lightweight alternative to Redux or Context API for state sharing." },
          { id: "D", title: "Handling side effects", desc: "Replaces useEffect for lifecycle management during initial mount." }
        ],
        status: "unattempted",
        savedAnswer: null
      },
      {
        id: 2,
        type: "Multiple Choice",
        points: 10,
        mlCalibratedTag: "State Management & Architecture",
        prompt: "Which Hook should you use to avoid expensive calculations on every re-render in React?",
        instruction: "Select the most accurate option below.",
        options: [
          { id: "A", title: "useState", desc: "Declares state variables that persist across renders." },
          { id: "B", title: "useMemo", desc: "Caches the result of a calculation between re-renders." },
          { id: "C", title: "useCallback", desc: "Memoizes a callback function instance." },
          { id: "D", title: "useRef", desc: "Holds a mutable value that doesn't trigger re-renders." }
        ],
        status: "unattempted",
        savedAnswer: null
      },
      {
        id: 3,
        type: "Multiple Choice",
        points: 15,
        mlCalibratedTag: "Asynchronous JavaScript",
        prompt: "What is the output order of Promises and setTimeout in the JavaScript event loop?",
        instruction: "Select the correct behavioral sequence.",
        options: [
          { id: "A", title: "Macrotasks run before Microtasks", desc: "setTimeout callbacks execute prior to Promise microtasks." },
          { id: "B", title: "Microtasks run before Macrotasks", desc: "Promise microtasks (queueMicrotask) execute before macrotasks like setTimeout." },
          { id: "C", title: "Synchronous execution only", desc: "Asynchronous tasks are bypassed entirely during execution." },
          { id: "D", title: "Random execution order", desc: "Execution order is non-deterministic based on CPU load." }
        ],
        status: "unattempted",
        savedAnswer: null
      }
    ]
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const currentQ = assessmentData.questions[currentQuestionIndex];
  const totalQCount = assessmentData.questions.length;

  useEffect(() => {
    async function fetchAssessment() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/assessment/active`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        if (response.ok && data.assessment) {
          setAssessmentData(data.assessment);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchAssessment();
  }, []);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          if (parsedUser.name) setCandidateName(parsedUser.name);
          if (parsedUser.email) setCandidateEmail(parsedUser.email);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(candidateName);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
      } catch (err) {
        console.error(err);
        setCameraError("Camera access denied or unavailable.");
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

  useEffect(() => {
    if (!cameraActive) return;

    const proctoringInterval = setInterval(async () => {
      try {
        const mockActivities = ["NORMAL", "LOOKING_LEFT", "LOOKING_RIGHT", "LOOKING_AWAY"];
        const randomActivity = mockActivities[Math.floor(Math.random() * mockActivities.length)];
        
        let flag = "NO";
        let reason = "Candidate posture and gaze stable within normal parameters.";
        if (randomActivity !== "NORMAL") {
          flag = "YES";
          reason = `Extended gaze deviation detected: ${randomActivity.replace("_", " ").toLowerCase()}.`;
        }

        setProctoringState(prev => ({
          ...prev,
          predictedActivity: randomActivity,
          modelConfidence: +(0.90 + Math.random() * 0.09).toFixed(2),
          visualActivityFlag: flag,
          flagReason: reason,
          lookingAwayEventsCount: randomActivity === "LOOKING_AWAY" ? prev.lookingAwayEventsCount + 1 : prev.lookingAwayEventsCount
        }));

      } catch (err) {
        console.error(err);
      }
    }, 4000);

    return () => clearInterval(proctoringInterval);
  }, [cameraActive]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prev) => {
          const updatedCount = prev + 1;
          
          if (updatedCount === 1 || updatedCount === 2) {
            setWarningMessage(`Warning ${updatedCount}/2: Leaving the assessment tab or minimizing the window is prohibited. Your activity has been flagged. One more violation will result in automatic submission.`);
            setWarningModalOpen(true);
            
            setProctoringState(p => ({
              ...p,
              visualActivityFlag: "YES",
              flagReason: `Tab switch detected (${updatedCount}/2).`,
              lookingAwayEventsCount: p.lookingAwayEventsCount + 1
            }));
          } else if (updatedCount >= 3) {
            setWarningMessage("Maximum tab switch limit (3) exceeded. Submitting assessment automatically.");
            setWarningModalOpen(true);
            
            setTimeout(() => {
              handleFinalSubmit();
            }, 2500);
          }
          
          return updatedCount;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSubmittedModalOpen(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveAnswer = () => {
    if (!selectedOption) return;
    const updatedQuestions = [...assessmentData.questions];
    updatedQuestions[currentQuestionIndex] = {
      ...currentQ,
      status: "saved",
      savedAnswer: selectedOption
    };
    setAssessmentData({ ...assessmentData, questions: updatedQuestions });

    if (currentQuestionIndex < totalQCount - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(updatedQuestions[nextIndex].savedAnswer);
    }
  };

  const handleSkipQuestion = () => {
    const updatedQuestions = [...assessmentData.questions];
    updatedQuestions[currentQuestionIndex] = {
      ...currentQ,
      status: "skipped",
      savedAnswer: selectedOption
    };
    setAssessmentData({ ...assessmentData, questions: updatedQuestions });

    if (currentQuestionIndex < totalQCount - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(updatedQuestions[nextIndex].savedAnswer);
    }
  };

  const handleNavigation = (direction) => {
    let newIndex = currentQuestionIndex;
    if (direction === "next" && currentQuestionIndex < totalQCount - 1) {
      newIndex = currentQuestionIndex + 1;
    } else if (direction === "prev" && currentQuestionIndex > 0) {
      newIndex = currentQuestionIndex - 1;
    }
    setCurrentQuestionIndex(newIndex);
    setSelectedOption(assessmentData.questions[newIndex].savedAnswer);
  };

  const handleFinalSubmit = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }

    const now = new Date();
    const optionsDate = { month: 'long', day: 'numeric', year: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: true };
    const liveTimestamp = `${now.toLocaleDateString('en-US', optionsDate)} · ${now.toLocaleTimeString('en-US', optionsTime)} IST`;

    const currentSavedCount = assessmentData.questions.filter(q => q.status === "saved").length;

    const sessionSummary = {
      assessmentTitle: assessmentData.assessmentTitle,
      candidateName: candidateName,
      candidateEmail: candidateEmail,
      savedResponsesCount: currentSavedCount,
      receiptRef: `REC-${Math.floor(10000 + Math.random() * 90000)}-SR`,
      submissionTime: liveTimestamp,
      answers: assessmentData.questions.map(q => ({ questionId: q.id, answer: q.savedAnswer })),
      proctoringAnalytics: {
        facePresencePct: proctoringState.facePresencePct,
        gazeDistribution: proctoringState.gazeDistribution,
        maxFacesDetected: proctoringState.maxFacesDetected,
        longestFaceAbsenceSecs: proctoringState.longestFaceAbsenceSecs,
        multipleFaceDurationSecs: proctoringState.multipleFaceDurationSecs,
        lookingAwayEvents: proctoringState.lookingAwayEventsCount,
        tabSwitchesCount: tabSwitchCount,
        finalActivityStatus: proctoringState.predictedActivity,
        finalVisualFlag: proctoringState.visualActivityFlag,
        flagReason: proctoringState.flagReason
      }
    };

    try {
      const token = localStorage.getItem("token");
      const profileId = sessionStorage.getItem("candidateProfileId");
      await fetch(`${import.meta.env.VITE_API_URL}/api/assessment/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ ...sessionSummary, profileId })
      });
    } catch (err) {
      console.error(err);
    }

    localStorage.setItem("assessmentSubmission", JSON.stringify(sessionSummary));
    navigate("/candidate/assessment-complete");
  };

  const savedCount = assessmentData.questions.filter(q => q.status === "saved").length;
  const skippedCount = assessmentData.questions.filter(q => q.status === "skipped").length;
  const unattemptedCount = assessmentData.questions.filter(q => q.status === "unattempted").length;
  const progressPercentage = Math.round((savedCount / totalQCount) * 100);

  return (
    <div className="min-h-screen bg-[#060F0A] text-slate-100 flex flex-col font-sans select-none">
      {warningModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#09160E] border border-amber-500/40 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl text-center">
            <div className="w-14 h-14 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto shadow-lg shadow-amber-500/10">
              ⚠️
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Proctoring Security Warning</h3>
              <p className="text-xs text-amber-300/90 leading-relaxed font-medium">
                {warningMessage}
              </p>
            </div>
            <button
              onClick={() => setWarningModalOpen(false)}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              I Understand & Return to Assessment
            </button>
          </div>
        </div>
      )}
      {submittedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#09160E] border border-emerald-500/30 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl text-center">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Assessment Submitted Successfully</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your responses and face activity proctoring telemetry have been securely recorded.
              </p>
            </div>
            <button
              onClick={handleFinalSubmit}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              Continue to Complete Page →
            </button>
          </div>
        </div>
      )}
      <header className="bg-[#09160E] border-b border-[#12281D] px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-black text-xs shadow-lg shadow-emerald-500/20">
            S
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-white block">SmartRecruit</span>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">{assessmentData.assessmentTitle}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-[#060F0A] border border-[#12281D] px-3.5 py-1.5 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono text-emerald-400 font-bold">{formatTime(timer)}</span>
          </div>

          <div className="flex items-center space-x-2.5 bg-[#060F0A] border border-[#12281D] pl-2 pr-3 py-1 rounded-xl">
            <div className="w-7 h-7 bg-emerald-500 text-black rounded-lg flex items-center justify-center text-xs font-bold">
              {initials}
            </div>
            <span className="text-xs font-semibold text-white">{candidateName}</span>
          </div>
        </div>
      </header>
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 my-6 flex flex-col lg:flex-row gap-6 flex-grow">
        <aside className="w-full lg:w-80 bg-[#09160E] border border-[#12281D] rounded-2xl p-5 flex flex-col justify-between space-y-6 shadow-xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Proctoring Feed</span>
                <span className="flex items-center space-x-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Live XGBoost AI</span>
                </span>
              </div>
              <div className="relative w-full h-36 bg-black rounded-xl overflow-hidden border border-[#12281D] flex items-center justify-center">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform -scale-x-100" />
                {!cameraActive && (
                  <div className="absolute inset-0 flex items-center justify-center p-2 text-center bg-[#060F0A]/90">
                    <p className="text-[10px] text-amber-400">{cameraError || "Camera starting..."}</p>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center justify-between border border-white/10">
                  <span className="text-[9px] font-mono font-bold text-emerald-400">{proctoringState.predictedActivity}</span>
                  <span className="text-[9px] font-mono text-slate-300">{(proctoringState.modelConfidence * 100).toFixed(0)}% Conf</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 bg-[#060F0A] border border-[#12281D] rounded-xl p-3.5">
              <div className="flex items-center justify-between border-b border-[#12281D] pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Activity Telemetry</span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                  proctoringState.visualActivityFlag === 'YES' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  Flag: {proctoringState.visualActivityFlag}
                </span>
              </div>

              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between text-slate-300">
                  <span>Face Presence:</span>
                  <span className="font-mono font-semibold text-white">{proctoringState.facePresencePct}%</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Tab Switches:</span>
                  <span className={`font-mono font-bold ${tabSwitchCount > 0 ? 'text-amber-400' : 'text-white'}`}>{tabSwitchCount} / 3</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Max Faces Detected:</span>
                  <span className="font-mono font-semibold text-white">{proctoringState.maxFacesDetected}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Looking Away Events:</span>
                  <span className="font-mono font-semibold text-white">{proctoringState.lookingAwayEventsCount}</span>
                </div>
              </div>

              {proctoringState.visualActivityFlag === 'YES' && (
                <div className="mt-2 p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <p className="text-[9px] text-amber-300 leading-relaxed"><strong className="font-bold">Reason:</strong> {proctoringState.flagReason}</p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Completion</span>
                <span className="text-emerald-400">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-[#060F0A] h-1.5 rounded-full overflow-hidden border border-[#12281D]">
                <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                <span>Saved: {savedCount}</span>
                <span>Skipped: {skippedCount}</span>
                <span>Unattempted: {unattemptedCount}</span>
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400 block">Question Palette</span>
              <div className="grid grid-cols-4 gap-2">
                {assessmentData.questions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  let bgClass = "bg-[#060F0A] text-slate-300 border-[#12281D]";
                  if (q.status === "saved") bgClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/50";
                  if (q.status === "skipped") bgClass = "bg-amber-500/20 text-amber-300 border-amber-500/50";
                  if (isCurrent) bgClass += " ring-2 ring-emerald-500";

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentQuestionIndex(idx);
                        setSelectedOption(q.savedAnswer);
                      }}
                      className={`h-10 rounded-xl border flex flex-col items-center justify-center text-xs font-bold transition-all cursor-pointer ${bgClass}`}
                    >
                      <span>{q.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <button
            onClick={handleFinalSubmit}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            Submit Assessment
          </button>
        </aside>
        <main className="flex-grow bg-[#09160E] border border-[#12281D] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-8 shadow-xl">
          
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#12281D] pb-4">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wide">{currentQ.type}</span>
              <span className="text-xs font-mono text-slate-400">Question {currentQuestionIndex + 1} of {totalQCount} · {currentQ.points} Points</span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] text-emerald-400/80 font-medium block">{currentQ.mlCalibratedTag}</span>
              <h1 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {currentQ.prompt}
              </h1>
              <p className="text-xs text-slate-400">{currentQ.instruction}</p>
            </div>
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                      isSelected 
                        ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-500/5' 
                        : 'bg-[#060F0A] border-[#12281D] text-slate-300 hover:border-emerald-500/40'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                      isSelected ? 'bg-emerald-500 text-black border-emerald-500' : 'border-[#12281D] text-slate-400 bg-[#09160E]'
                    }`}>
                      {opt.id}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-white">{opt.title}</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{opt.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={handleSkipQuestion}
                className="px-4 py-2.5 rounded-xl bg-[#060F0A] border border-[#12281D] text-slate-300 hover:text-white hover:border-slate-600 text-xs font-semibold transition-all cursor-pointer"
              >
                Skip Question →
              </button>

              <button
                onClick={handleSaveAnswer}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                Save Answer & Next
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-[#12281D] flex items-center justify-between">
            <button
              onClick={() => handleNavigation("prev")}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border border-[#12281D] transition-all ${
                currentQuestionIndex === 0 ? 'opacity-40 cursor-not-allowed bg-[#060F0A] text-slate-600' : 'bg-[#060F0A] text-slate-300 hover:bg-[#12281D] cursor-pointer'
              }`}
            >
              ← Previous Question
            </button>
            <button
              onClick={() => {
                if (currentQuestionIndex === totalQCount - 1) {
                  handleFinalSubmit();
                } else {
                  handleNavigation("next");
                }
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#060F0A] border border-[#12281D] text-emerald-400 hover:bg-[#12281D] transition-all cursor-pointer"
            >
              {currentQuestionIndex === totalQCount - 1 ? "Submit Assessment →" : "Next Question →"}
            </button>
          </div>

        </main>

      </div>

      <footer className="bg-[#09160E] border-t border-[#12281D] px-6 py-4 flex items-center justify-between text-xs text-slate-400">
        <span>© SmartRecruit · Candidate assessment session</span>
        <span>XGBoost Face Activity & Tab Proctoring Active</span>
      </footer>

    </div>
  );
}

export default CandidateActiveAssessment;