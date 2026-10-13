import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import logo from "../Candidate/logo.jpeg";
import RecruiterProfile from "../Candidate/Recruiter.jpeg";

function CandidateAssessmentReview() {
  const navigate = useNavigate();
  const { candidateId: attemptId } = useParams();
  const [selectedDecision, setSelectedDecision] = useState("review");
  const [recruiterNote, setRecruiterNote] = useState("");
  const [loadError, setLoadError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [recruiterName] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}").name || "Recruiter"; }
    catch { return "Recruiter"; }
  });
  const [candidateData, setCandidateData] = useState({
    name: "Candidate",
    email: "",
    role: "Assessment candidate",
    overallScore: null,
    completedTime: "Not submitted",
    percentile: "Not calculated",
    verified: false,
    sections: {
      coding: { score: null, details: "No coding evaluation saved" },
      technicalKnowledge: { score: null, details: "No technical evaluation saved" },
      communication: { score: null, details: "No communication evaluation saved" }
    },
    evidence: []
  });

  useEffect(() => {
    let active = true;
    async function fetchCandidateDetails() {
      if (!attemptId) {
        setLoadError("No assessment attempt was selected. Return to the candidate list and choose an attempt.");
        return;
      }
      try {
        const data = await api(`/api/recruiter/candidate/${attemptId}`);
        if (!active) return;
        if (!data.candidate) throw new Error("The backend returned no candidate details.");
        setCandidateData((previous) => ({ ...previous, ...data.candidate }));
        setRecruiterNote(data.candidate.recruiterNote || "");
        const decision = data.candidate.decision || "pending";
        setSelectedDecision(decision === "shortlisted" ? "shortlisted" : decision === "rejected" ? "not_selected" : "review");
        setLoadError("");
      } catch (error) {
        if (active) setLoadError(error.message || "Could not load the candidate assessment from the backend.");
      }
    }
    fetchCandidateDetails();
    return () => { active = false; };
  }, [attemptId]);

  const handleSaveDecision = async () => {
    setSaving(true);
    setSaveMessage("");
    try {
      await api(`/api/recruiter/candidate/${attemptId}/decision`, {
        method: "POST",
        body: JSON.stringify({ decision: selectedDecision, note: recruiterNote })
      });
      setSaveMessage(`Decision saved for ${candidateData.name}.`);
    } catch (error) {
      setSaveMessage(error.message || "Could not save the decision.");
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div 
      className="min-h-screen bg-[#F5F7FB] text-[#172554] flex flex-col md:flex-row selection:bg-[#2563EB] selection:text-white scroll-smooth"
      style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
    >
      <aside className="w-full md:w-[240px] h-auto md:h-screen bg-[#142B43] text-slate-400 border-b md:border-b-0 md:border-r border-[#CBD5E1] p-4 flex flex-col justify-between md:sticky md:top-0 shrink-0 overflow-y-auto">
        <div className="flex flex-col gap-5">
          <div
            className="w-full h-[56px] flex items-center justify-between md:justify-start gap-[10px] px-1 pb-4 border-b border-[#CBD5E1]/30 cursor-pointer"
            onClick={() => navigate("/recruiter/dashboard")}
          >
            <div className="flex items-center gap-[10px]">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-blue-300/40 shrink-0 overflow-hidden bg-white">
                <img
                  src={logo}
                  alt="SmartRecruit Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-[#FFFFFF] leading-none">
                  SmartRecruit
                </span>
                <span className="text-[9px] tracking-[1.5px] text-slate-400 uppercase mt-1 font-semibold">
                  Recruiter Workspace
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center p-3 bg-[#193653] border border-slate-600/50 rounded-xl gap-2 my-2">
            <div className="w-14 h-14 rounded-full bg-[#142B43] border-2 border-blue-400/50 overflow-hidden flex items-center justify-center relative shadow-inner">
              <img
                src={RecruiterProfile}
                alt="Recruiter profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-bold text-white text-center truncate w-full">{recruiterName}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="hidden md:block text-[11px] text-slate-400 tracking-[1.5px] font-bold px-2 mb-1 uppercase">
              Workspace
            </span>

            <nav className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-1 text-[11px] pb-2 md:pb-0 scrollbar-none font-medium">
              <button
                onClick={() => navigate("/recruiter/dashboard")}
                className="h-[35px] px-3 rounded-xl hover:bg-[#193653] hover:text-[#FFFFFF] flex items-center gap-2 whitespace-nowrap transition-colors shrink-0 font-semibold w-full text-left bg-transparent border-none cursor-pointer text-slate-400"
              >
                <i className="fa-solid fa-chart-pie text-[15px]"></i>
                Dashboard
              </button>

              <button
                onClick={() => navigate("/recruiter/candidates")}
                className="h-[35px] px-3 rounded-xl bg-[#193653] text-[#FFFFFF] flex items-center justify-between whitespace-nowrap transition-colors shrink-0 font-bold w-full text-left border-none cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-user text-[15px]"></i>
                  Candidates
                </div>
                <span className="bg-[#2563EB] text-white font-bold px-1.5 py-0.5 rounded text-[10px]">Active</span>
              </button>

              <button
                onClick={() => navigate("/recruiter/assessments/create")}
                className="h-[35px] px-3 rounded-xl hover:bg-[#193653] hover:text-[#FFFFFF] flex items-center gap-2 whitespace-nowrap transition-colors shrink-0 font-semibold w-full bg-transparent border-none cursor-pointer text-slate-400"
              >
                <i className="fa-solid fa-file-lines text-[15px]"></i>
                Assessments
              </button>

              <button
                className="h-[35px] px-3 rounded-xl hover:bg-[#193653] hover:text-[#FFFFFF] flex items-center gap-2 whitespace-nowrap transition-colors shrink-0 font-semibold w-full bg-transparent border-none cursor-pointer text-slate-400"
              >
                <i className="fa-solid fa-code text-[15px]"></i>
                Open roles
              </button>

              <button
                className="h-[35px] px-3 rounded-xl hover:bg-[#193653] hover:text-[#FFFFFF] flex items-center gap-2 whitespace-nowrap transition-colors shrink-0 font-semibold w-full bg-transparent border-none cursor-pointer text-slate-400"
              >
                <i className="fa-solid fa-chart-bar text-[15px]"></i>
                Reports
              </button>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <div className="p-3 bg-[#193653] border border-slate-600/50 rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-2 border-b border-slate-600/50 pb-2">
              <div className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
                {getInitials(candidateData.name)}
              </div>
              <span className="text-xs font-bold text-white truncate">{candidateData.name}</span>
            </div>
            <div className="flex flex-col gap-1 text-[11px] text-slate-300 font-medium">
              <a href="#performance-overview" className="hover:text-blue-300 transition-colors py-0.5">Performance overview</a>
              <a href="#assessment-evidence" className="hover:text-blue-300 transition-colors py-0.5">Assessment evidence</a>
              <a href="#review-notes" className="hover:text-blue-300 transition-colors py-0.5">Review notes</a>
              <a href="#recruiter-decision" className="hover:text-blue-300 transition-colors py-0.5">Recruiter decision</a>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFF]">
        <header className="w-full h-[62px] border-b border-slate-200/60 bg-[#F8FAFF] sticky top-0 z-50">
          <div className="max-w-[1040px] h-full mx-auto px-4 sm:px-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <span className="hover:text-[#172554] cursor-pointer font-bold" onClick={() => navigate("/recruiter/candidates")}>Candidates</span>
              <span>›</span>
              <span className="text-[#172554] font-bold">{candidateData.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl text-xs font-bold text-[#172554]">
                <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                  {recruiterName.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <span>{recruiterName}</span>
              </div>
            </div>
          </div>
        </header>
        
        <div className="max-w-6xl mx-auto w-full p-4 sm:p-8 flex flex-col gap-6 flex-grow">
          {loadError && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600 shadow-sm" role="alert">{loadError}</div>}
          {saveMessage && <div className={`rounded-xl border px-4 py-3 text-xs font-bold shadow-sm ${saveMessage.toLowerCase().includes("saved") ? "border-blue-200 bg-blue-50 text-[#2563EB]" : "border-red-200 bg-red-50 text-red-600"}`} role="status">{saveMessage}</div>}
          
          <div className="p-6 bg-white border border-blue-100 rounded-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-bold text-base shadow-md shadow-blue-500/20">
                {getInitials(candidateData.name)}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-xl font-extrabold text-[#111e2e] tracking-tight">{candidateData.name}</h1>
                  <span className="text-xs text-slate-500 font-semibold">{candidateData.role}</span>
                  <span className="text-xs text-slate-300">•</span>
                  <span className="text-xs text-slate-600 font-medium">{candidateData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#2563EB] mt-1 font-bold">
                  <i className="fa-solid fa-check text-[10px]"></i> {candidateData.completedTime === "Not submitted" ? "Assessment not submitted" : "Assessment submission recorded"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-blue-100">
              <div className="flex flex-col lg:text-right">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Overall assessment</span>
                <div className="flex items-baseline lg:justify-end gap-1">
                  <span className="text-3xl font-extrabold text-[#111e2e]">{candidateData.overallScore ?? "—"}</span>
                  <span className="text-xs text-slate-400 font-bold">/ 100</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-xs text-slate-600 font-semibold border-l border-blue-100 pl-6">
                <div className="flex items-center gap-2 text-slate-500">
                  <i className="fa-regular fa-clock text-xs"></i> Completed {candidateData.completedTime}
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <i className="fa-solid fa-chart-line text-xs text-[#2563EB]"></i> Cohort percentile {candidateData.percentile}
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <i className="fa-solid fa-shield-halved text-xs text-[#2563EB]"></i> {candidateData.verified ? "System check completed" : "System check not recorded"}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <section id="performance-overview" className="p-6 bg-white border border-blue-100 rounded-2xl flex flex-col gap-5 shadow-sm">
                <div className="flex flex-col">
                  <h2 className="text-base font-extrabold text-[#111e2e] tracking-tight">Performance overview</h2>
                  <span className="text-xs text-slate-500 font-medium">Assessment results by section</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex flex-col gap-3 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-700 font-bold">Coding</span>
                      <span className="text-sm font-extrabold text-[#111e2e]">{candidateData.sections.coding.score ?? "—"} / 100</span>
                    </div>
                    <div className="w-full bg-slate-100 border border-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-full rounded-full" style={{ width: `${candidateData.sections.coding.score ?? 0}%` }}></div>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{candidateData.sections.coding.details}</span>
                  </div>

                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex flex-col gap-3 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-700 font-bold">Technical knowledge</span>
                      <span className="text-sm font-extrabold text-[#111e2e]">{candidateData.sections.technicalKnowledge.score ?? "—"} / 100</span>
                    </div>
                    <div className="w-full bg-slate-100 border border-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-full rounded-full" style={{ width: `${candidateData.sections.technicalKnowledge.score ?? 0}%` }}></div>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{candidateData.sections.technicalKnowledge.details}</span>
                  </div>

                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex flex-col gap-3 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-700 font-bold">Communication</span>
                      <span className="text-sm font-extrabold text-[#111e2e]">{candidateData.sections.communication.score ?? "—"} / 100</span>
                    </div>
                    <div className="w-full bg-slate-100 border border-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-full rounded-full" style={{ width: `${candidateData.sections.communication.score ?? 0}%` }}></div>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{candidateData.sections.communication.details}</span>
                  </div>
                </div>
              </section>

              <section id="assessment-evidence" className="p-6 bg-white border border-blue-100 rounded-2xl flex flex-col gap-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-base font-extrabold text-[#111e2e] tracking-tight">Assessment evidence</h2>
                    <span className="text-xs text-slate-500 font-medium">Open a section to review the candidate's work.</span>
                  </div>
                  <span className="text-xs text-slate-500 font-bold">{candidateData.evidence.length} responses</span>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  {candidateData.evidence.map((item, index) => {
                    let iconClass = "fa-solid fa-code";
                    if (["mcq", "technical"].includes(item.type)) iconClass = "fa-solid fa-list-check";
                    if (["spoken", "audio"].includes(item.type)) iconClass = "fa-solid fa-microphone";

                    return (
                      <div key={index} className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex flex-col gap-3 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-[#2563EB] text-xs shadow-sm">
                              <i className={iconClass}></i>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-[#111e2e]">{item.title}</span>
                              <span className="text-[11px] text-slate-500 font-medium">{item.meta}</span>
                            </div>
                          </div>
                          <span className="text-xs font-extrabold text-[#111e2e]">{item.score ?? "—"} / {item.maxScore || 100}</span>
                        </div>
                        <div className="pt-2 border-t border-blue-100 flex justify-end">
                          <button className="text-xs text-[#2563EB] hover:underline cursor-pointer bg-transparent border-none font-bold">
                            {item.actionText}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section id="review-notes" className="p-6 bg-white border border-blue-100 rounded-2xl flex flex-col gap-4 shadow-sm">
                <div className="flex flex-col">
                  <h2 className="text-base font-extrabold text-[#111e2e] tracking-tight">Review notes</h2>
                  <span className="text-xs text-slate-500 font-medium">Observations for the recruiting team.</span>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 shadow-sm">
                    <i className="fa-solid fa-triangle-exclamation text-amber-600 text-xs mt-0.5"></i>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-amber-800">Evidence availability</span>
                      <p className="text-xs text-slate-700 mt-0.5 font-medium">Saved answers and face/tab monitoring summaries are shown when available. Automated scoring is not configured for this personalized MCQ interview.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-blue-200 rounded-xl flex flex-col gap-2 shadow-sm">
                    <textarea 
                      rows="3"
                      value={recruiterNote}
                      onChange={(e) => setRecruiterNote(e.target.value)}
                      placeholder="Add a recruiter note for your team..."
                      className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none resize-none font-medium"
                    ></textarea>
                  </div>
                </div>
              </section>
            </div>

            <div className="flex flex-col gap-6">
              <div className="p-6 bg-white border border-blue-100 rounded-2xl flex flex-col gap-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-[#111e2e] tracking-tight">Score summary</h3>
                  <span className="text-[10px] text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 font-bold">{candidateData.percentile}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-500 font-bold">{candidateData.overallScore ?? "—"} / 100 overall</span>
                </div>

                <div className="flex flex-col gap-4 pt-2 border-t border-blue-100">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-600">Coding</span>
                      <span className="text-[#111e2e]">{candidateData.sections.coding.score ?? "—"}</span>
                    </div>
                    <div className="w-full bg-slate-100 border border-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-full rounded-full" style={{ width: `${candidateData.sections.coding.score ?? 0}%` }}></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-600">Technical knowledge</span>
                      <span className="text-[#111e2e]">{candidateData.sections.technicalKnowledge.score ?? "—"}</span>
                    </div>
                    <div className="w-full bg-slate-100 border border-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-full rounded-full" style={{ width: `${candidateData.sections.technicalKnowledge.score ?? 0}%` }}></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-600">Communication</span>
                      <span className="text-[#111e2e]">{candidateData.sections.communication.score ?? "—"}</span>
                    </div>
                    <div className="w-full bg-slate-100 border border-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-full rounded-full" style={{ width: `${candidateData.sections.communication.score ?? 0}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <section id="recruiter-decision" className="p-6 bg-white border border-blue-100 rounded-2xl flex flex-col gap-4 shadow-sm">
                <div className="flex flex-col">
                  <h3 className="text-base font-extrabold text-[#111e2e] tracking-tight">Recruiter decision</h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">Record your team's next step.</p>
                  <span className="text-[11px] text-slate-400 font-medium mt-1">Consider the full application and interview context.</span>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <label 
                    onClick={() => setSelectedDecision("review")}
                    className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all shadow-sm ${
                      selectedDecision === "review" 
                        ? "bg-blue-50 border-[#2563EB]" 
                        : "bg-white border-slate-200 hover:border-blue-200"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="decision" 
                      checked={selectedDecision === "review"}
                      onChange={() => setSelectedDecision("review")}
                      className="mt-1 accent-[#2563EB]" 
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#111e2e]">Review</span>
                      <span className="text-[11px] text-slate-500 mt-0.5 font-medium">Discuss with the team or follow up.</span>
                    </div>
                  </label>

                  <label onClick={() => setSelectedDecision("shortlisted")}
                    className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all shadow-sm ${
                      selectedDecision === "shortlisted" 
                        ? "bg-blue-50 border-[#2563EB]" 
                        : "bg-white border-slate-200 hover:border-blue-200"
                    }`}>
                    <input type="radio" name="decision" 
                      checked={selectedDecision === "shortlisted"}
                      onChange={() => setSelectedDecision("shortlisted")}
                      className="mt-1 accent-[#2563EB]" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#111e2e]">Shortlisted</span>
                      <span className="text-[11px] text-slate-500 mt-0.5 font-medium">Progress to a hiring team interview.</span>
                    </div>
                  </label>

                  <label onClick={() => setSelectedDecision("not_selected")}
                    className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all shadow-sm ${
                      selectedDecision === "not_selected" 
                        ? "bg-blue-50 border-[#2563EB]" 
                        : "bg-white border-slate-200 hover:border-blue-200"
                    }`}>
                    <input type="radio" name="decision" checked={selectedDecision === "not_selected"}
                      onChange={() => setSelectedDecision("not_selected")}
                      className="mt-1 accent-[#2563EB]" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#111e2e]">Not selected</span>
                      <span className="text-[11px] text-slate-500 mt-0.5 font-medium">Does not meet the current role criteria.</span>
                    </div>
                  </label>
                </div>

                <button onClick={handleSaveDecision} disabled={saving || !attemptId}
                  className="w-full mt-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-blue-500/20 border-none"
                >
                  {saving ? "Saving…" : "Save decision"}
                </button>
              </section>
            </div>
          </div>

          <footer className="pt-6 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-semibold">
            <div className="flex items-center gap-2">
              <button onClick={() => navigate(-1)} className="hover:text-[#172554] transition-colors cursor-pointer bg-transparent border-none font-bold">
                ← Back to candidates
              </button>
              <span>·</span>
              <span className="font-bold text-[#172554]">SmartRecruit</span>
              <span>— Candidate scorecard</span>
            </div>
            <div className="flex gap-6 font-bold">
              <span className="hover:text-[#2563EB] cursor-pointer">Candidate information</span>
              <span className="hover:text-[#2563EB] cursor-pointer">Privacy details</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default CandidateAssessmentReview;