import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import logo from "../Candidate/logo.jpeg";
import RecruiterProfile from "../Candidate/Recruiter.jpeg";

function CreateAssessment() {
  const navigate = useNavigate();
  const [assessmentName, setAssessmentName] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [timeLimit, setTimeLimit] = useState("30");
  const [recruitmentDrive, setRecruitmentDrive] = useState("");
  const [recruiterName] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}").name || "Recruiter"; }
    catch { return "Recruiter"; }
  });
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatesList, setCandidatesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (candidateEmail.trim() && !candidatesList.includes(candidateEmail.trim())) {
      setCandidatesList([...candidatesList, candidateEmail.trim()]);
      setCandidateEmail("");
    }
  };

  const removeCandidate = (indexToRemove) => {
    setCandidatesList(candidatesList.filter((_, index) => index !== indexToRemove));
  };

  const handlePublishAssessment = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const durationMinutes = Number.parseInt(timeLimit, 10);
      if (!assessmentName.trim() || !targetRole.trim() || !Number.isFinite(durationMinutes) || durationMinutes < 1) {
        throw new Error("Enter an assessment name, target role, and a valid duration in minutes.");
      }
      const now = new Date();
      const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      const driveResponse = await api("/api/drives", {
        method: "POST",
        body: JSON.stringify({
          title: recruitmentDrive.trim() || assessmentName.trim(),
          company: storedUser.company || "SmartRecruit",
          role: targetRole.trim(),
          description: `Assessment: ${assessmentName.trim()}`,
          location: "Remote",
          startDate: now.toISOString(),
          endDate: endDate.toISOString(),
          isActive: true
        })
      });
      const drive = driveResponse.data?.drive;
      if (!drive?._id) throw new Error("The backend created no recruitment drive ID.");

      const assessmentResponse = await api("/api/assessment", {
        method: "POST",
        body: JSON.stringify({
          driveId: drive._id,
          title: assessmentName.trim(),
          durationMinutes,
          instructions: "Please read each question carefully and submit your answers before the time limit.",
          questions: [],
          weights: { coding: 40, technical: 30, communication: 20, other: 10 }
        })
      });
      if (!assessmentResponse.success) throw new Error("Assessment could not be saved by the backend.");
      navigate("/recruiter/candidates");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
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
                className="h-[35px] px-3 rounded-xl hover:bg-[#193653] hover:text-[#FFFFFF] flex items-center justify-between whitespace-nowrap transition-colors shrink-0 font-semibold w-full bg-transparent border-none cursor-pointer text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-user text-[15px]"></i>
                  Candidates
                </div>
                <span className="bg-[#2563EB] text-white font-bold px-1.5 py-0.5 rounded text-[10px]">{candidatesList.length}</span>
              </button>

              <button
                className="h-[35px] px-3 rounded-xl bg-[#193653] text-[#FFFFFF] flex items-center gap-2 whitespace-nowrap transition-colors shrink-0 font-bold w-full text-left border-none cursor-pointer"
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
          <div className="p-3 bg-[#193653] border border-slate-600/50 rounded-xl flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Current draft</span>
            <span className="text-xs font-bold text-white truncate">{assessmentName || "Untitled assessment"}</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFF]">
        <header className="w-full h-[62px] border-b border-slate-200/60 bg-[#F8FAFF] sticky top-0 z-50">
          <div className="max-w-[1040px] h-full mx-auto px-4 sm:px-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <span className="hover:text-[#172554] cursor-pointer font-bold" onClick={() => navigate("/recruiter/dashboard")}>Assessments</span>
              <span>›</span>
              <span className="text-[#172554] font-bold">Create assessment</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                <span>Draft saved</span>
              </div>
              <button onClick={handlePublishAssessment} className="bg-white hover:bg-blue-50 border border-blue-200 text-[#2563EB] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm">
                Save draft
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto w-full p-4 sm:p-8 flex flex-col gap-6 flex-grow">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">New assessment</span>
              <h1 className="text-3xl sm:text-4xl text-[#111e2e] tracking-tight font-extrabold">Set up your assessment.</h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">Add the role details, choose your questions, then invite candidates.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#2563EB] bg-blue-50 border border-blue-200 px-3.5 py-2 rounded-xl font-bold">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
              <span>Draft - saved just now</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
              <div className="w-7 h-7 rounded-lg bg-white border border-blue-200 text-[#2563EB] flex items-center justify-center text-xs font-bold shadow-sm"><i className="fa-solid fa-file-lines"></i></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#2563EB] uppercase font-bold tracking-wider">Step 1</span>
                <span className="text-xs font-bold text-[#111e2e]">Details</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white border border-blue-100 rounded-xl shadow-sm">
              <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold shadow-sm">2</div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Step 2</span>
                <span className="text-xs font-bold text-[#111e2e]">Questions</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white border border-blue-100 rounded-xl shadow-sm">
              <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center text-xs font-bold">3</div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Step 3</span>
                <span className="text-xs font-bold text-slate-500">Invite candidates</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-blue-100 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-blue-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#2563EB] text-white font-bold flex items-center justify-center text-xs shadow-sm">1</span>
                <h2 className="text-base font-bold text-[#111e2e]">Assessment details</h2>
                <span className="text-xs text-slate-500 font-medium">Set the basics candidates will see.</span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold">Required fields marked *</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Assessment name *</label>
                <input
                  type="text"
                  placeholder="e.g. Backend Developer Assessment"
                  value={assessmentName}
                  onChange={(e) => setAssessmentName(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] font-medium shadow-sm"
                />
                <span className="text-[10px] text-slate-400 font-medium">Saved to the backend with this assessment.</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Target role *</label>
                <input
                  type="text"
                  placeholder="e.g. Backend Developer"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] font-medium shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Time limit *</label>
                <input
                  type="number"
                  min="1"
                  placeholder="Duration in minutes"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] font-medium shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Recruitment drive</label>
                <input
                  type="text"
                  placeholder="e.g. October engineering hiring drive"
                  value={recruitmentDrive}
                  onChange={(e) => setRecruitmentDrive(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] font-medium shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-blue-100 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-blue-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#2563EB] text-white font-bold flex items-center justify-center text-xs shadow-sm">2</span>
                <h2 className="text-base font-bold text-[#111e2e]">Questions</h2>
              </div>
              <span className="text-[10px] text-slate-500 font-bold">Template preview only</span>
            </div>

            <p className="text-xs text-slate-600 font-medium">Preview only: the sample questions shown below are not yet connected to saved Question records. The form currently saves the assessment as a draft without these questions.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-1">
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#111e2e]">Multiple choice</span>
                  <span className="text-[10px] text-slate-500 font-medium">4 questions · 20 points</span>
                </div>
                <span className="text-[10px] text-[#2563EB] bg-blue-100 font-bold px-2.5 py-1 rounded-lg">Included</span>
              </div>

              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#111e2e]">Spoken response</span>
                  <span className="text-[10px] text-slate-500 font-medium">1 prompt · 10 points</span>
                </div>
                <span className="text-[10px] text-[#2563EB] bg-blue-100 font-bold px-2.5 py-1 rounded-lg">Included</span>
              </div>

              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#111e2e]">Coding challenge</span>
                  <span className="text-[10px] text-slate-500 font-medium">1 task · 20 points</span>
                </div>
                <span className="text-[10px] text-[#2563EB] bg-blue-100 font-bold px-2.5 py-1 rounded-lg">Included</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Assessment questions</span>
              <span className="text-[10px] text-slate-400 font-bold">Review or adjust before inviting candidates</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { no: "01", q: "Which statement best describes REST APIs and the GET and POST methods?", desc: "Multiple choice · 4 options · 5 pts" },
                { no: "02", q: "Which statement best describes asynchronous JavaScript?", desc: "Multiple choice · 4 options · 5 pts" },
                { no: "03", q: "Which approach uses event delegation to handle clicks on child elements?", desc: "Multiple choice · 4 options · 5 pts" },
                { no: "04", q: "Which metric is part of Core Web Vitals?", desc: "Multiple choice · 4 options · 5 pts" },
                { no: "05", q: "Explain the difference between synchronous and asynchronous JavaScript.", desc: "Spoken response · 2 min max · 10 pts" },
                { no: "06", q: "Reverse a string and consider the algorithm's runtime complexity.", desc: "Coding challenge · In-browser editor · 20 pts" }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-white border border-blue-100 rounded-xl flex items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-bold">{item.no}</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#111e2e]">{item.q}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{item.desc}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-600 font-bold">{item.desc.split(" · ").slice(-1)[0]}</span>
                    <i className="fa-solid fa-ellipsis text-xs text-slate-400 cursor-pointer"></i>
                  </div>
                </div>
              ))}

              <button className="w-full py-3 bg-white hover:bg-blue-50 border border-dashed border-blue-300 rounded-xl text-xs text-[#2563EB] font-bold transition-colors cursor-pointer text-center shadow-sm">
                + Add a question
              </button>
            </div>
          </div>

          <div className="bg-white border border-blue-100 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-blue-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#2563EB] text-white font-bold flex items-center justify-center text-xs shadow-sm">3</span>
                <h2 className="text-base font-bold text-[#111e2e]">Invite candidates</h2>
              </div>
              <span className="text-xs text-slate-500 font-bold">{candidatesList.length} candidates</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Email addresses are currently a local draft list; invitation delivery is not yet connected to the backend.</p>
            
            <form onSubmit={handleAddCandidate} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="email"
                placeholder="Candidate email address"
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] font-medium shadow-sm"
              />
              <div className="flex items-center gap-2">
                <button type="submit" className="bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#2563EB] px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm">
                  + Add candidate
                </button>
                <button type="button" className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm">
                  Upload CSV
                </button>
              </div>
            </form>

            <div className="flex flex-wrap gap-2 pt-2">
              {candidatesList.map((email, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl text-xs font-semibold">
                  <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                    {email.substring(0, 2).toUpperCase()}
                  </span>
                  <span className="text-slate-700">{email}</span>
                  <button type="button" onClick={() => removeCandidate(idx)} className="text-slate-400 hover:text-slate-600 ml-1 cursor-pointer bg-transparent border-none font-bold">×</button>
                </div>
              ))}
            </div>

            <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl flex items-center justify-between mt-2 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-[#2563EB] text-xs">
                  <i className="fa-solid fa-shield"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#111e2e]">Standard assessment safeguards</span>
                  <span className="text-[10px] text-slate-500 font-medium">Camera check and focus monitoring are enabled.</span>
                </div>
              </div>
              <span className="text-xs text-[#2563EB] font-bold">On by default</span>
            </div>
          </div>

          {errorMessage && (
            <div className="text-xs text-red-600 font-bold text-center">
              {errorMessage}
            </div>
          )}

          <div className="pt-6 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
              <span className="text-[#2563EB] font-bold">Ready to save draft</span>
              <span>·</span>
              <span>{assessmentName || "Untitled"}</span>
              <span>·</span>
              <span>0 saved questions</span>
              <span>·</span>
              <span>{candidatesList.length} candidates</span>
            </div>

            <div className="flex items-center gap-3">
              <button type="button" onClick={handlePublishAssessment} disabled={loading} className="bg-white hover:bg-blue-50 border border-blue-200 text-[#2563EB] px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50 shadow-sm">
                Save draft
              </button>
              <button
                type="button"
                onClick={handlePublishAssessment}
                disabled={loading}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-blue-500/20 disabled:opacity-50 border-none"
              >
                {loading ? "Creating..." : "Create assessment →"}
              </button>
            </div>
          </div>

          <footer className="pt-4 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-semibold border-t border-blue-100 mt-4">
            <div>
              <span className="font-bold text-[#172554]">SmartRecruit</span>
              <span className="text-slate-500">— Recruiter workspace</span>
            </div>
            <div className="flex gap-6 font-bold">
              <span className="hover:text-[#2563EB] cursor-pointer">Candidate privacy</span>
              <span className="hover:text-[#2563EB] cursor-pointer">Help</span>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
}

export default CreateAssessment;