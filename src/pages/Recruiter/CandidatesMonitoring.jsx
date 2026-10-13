import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import logo from "../Candidate/logo.jpeg";
import RecruiterProfile from "../Candidate/Recruiter.jpeg";

function CandidatesMonitoring() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [progressFilter, setProgressFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Latest activity");
  const [candidatesList, setCandidatesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [recruiterName] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}").name || "Recruiter"; }
    catch { return "Recruiter"; }
  });

  useEffect(() => {
    let active = true;
    let firstLoad = true;
    async function fetchCandidates() {
      if (firstLoad && active) setLoading(true);
      try {
        const data = await api("/api/recruiter/candidates");
        if (!active) return;
        setCandidatesList(Array.isArray(data.candidates) ? data.candidates : []);
        setLoadError("");
      } catch (error) {
        if (active) setLoadError(error.message || "Could not load candidates from the backend.");
      } finally {
        firstLoad = false;
        if (active) setLoading(false);
      }
    }
    fetchCandidates();
    const intervalId = setInterval(fetchCandidates, 15000);
    return () => { active = false; clearInterval(intervalId); };
  }, []);

  const filteredCandidates = candidatesList.filter((candidate) => {
    const matchesSearch = (candidate.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (candidate.email || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || candidate.status === statusFilter;
    const numericPercentage = parseInt(candidate.percentage, 10) || 0;
    const matchesProgress = progressFilter === "All" || 
                            (progressFilter === "50%" && numericPercentage >= 50) || 
                            (progressFilter === "100%" && numericPercentage === 100);
    return matchesSearch && matchesStatus && matchesProgress;
  }).sort((a, b) => {
    if (sortOrder === "Name") return (a.name || "").localeCompare(b.name || "");
    if (sortOrder === "Score") return (b.overallScore ?? -1) - (a.overallScore ?? -1);
    return 0;
  });

  const startedCount = candidatesList.filter((candidate) => candidate.status !== "Invited").length;
  const inProgressCount = candidatesList.filter((candidate) => candidate.status === "In progress").length;
  const completedCount = candidatesList.filter((candidate) => candidate.status === "Completed").length;
  const participationRate = candidatesList.length ? Math.round((startedCount / candidatesList.length) * 100) : 0;

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
                className="h-[35px] px-3 rounded-xl bg-[#193653] text-[#FFFFFF] flex items-center justify-between whitespace-nowrap transition-colors shrink-0 font-bold w-full text-left border-none cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-user text-[15px]"></i>
                  Candidates
                </div>
                <span className="bg-[#2563EB] text-white font-bold px-1.5 py-0.5 rounded text-[10px]">{candidatesList.length}</span>
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
          <div className="p-3 bg-[#193653] border border-slate-600/50 rounded-xl flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Recruiter overview</span>
            <span className="text-xs font-bold text-white">All recruitment drives</span>
            <span className="text-[10px] text-slate-400 font-medium">Candidate data linked to your account</span>

            <div className="flex justify-between items-center text-[10px] pt-2 border-t border-slate-600/50 mt-1 font-bold">
              <span className="text-slate-400">{candidatesList.length} candidates</span>
              <span className="text-blue-400">{inProgressCount} in progress</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFF]">
        <header className="w-full h-[62px] border-b border-slate-200/60 bg-[#F8FAFF] sticky top-0 z-50">
          <div className="max-w-[1040px] h-full mx-auto px-4 sm:px-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <span className="hover:text-[#172554] cursor-pointer font-bold" onClick={() => navigate("/recruiter/dashboard")}>Assessments</span>
              <span>›</span>
              <span className="text-[#172554] font-bold">Candidates</span>
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">Candidate activity</span>
              <h1 className="text-3xl sm:text-4xl text-[#111e2e] tracking-tight font-extrabold">Candidates & monitoring</h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">See who's working, who's finished, and where each candidate is in the assessment.</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="bg-white hover:bg-blue-50 border border-blue-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm">
                <i className="fa-solid fa-sliders text-xs"></i> Assessment settings
              </button>
              <button onClick={() => navigate("/recruiter/assessments/create")} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md shadow-blue-500/20 border-none">
                <i className="fa-solid fa-plus text-xs"></i> Add candidates
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-blue-100 rounded-2xl flex flex-col justify-between gap-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total candidates</span>
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] text-xs">
                  <i className="fa-solid fa-users"></i>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#111e2e]">{candidatesList.length}</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Across all cohorts</span>
            </div>

            <div className="p-5 bg-white border border-blue-100 rounded-2xl flex flex-col justify-between gap-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Started</span>
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] text-xs">
                  <i className="fa-solid fa-play"></i>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#111e2e]">{startedCount}</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">{participationRate}% participation</span>
            </div>

            <div className="p-5 bg-white border border-blue-100 rounded-2xl flex flex-col justify-between gap-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">In progress</span>
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] text-xs">
                  <i className="fa-regular fa-clock"></i>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#111e2e]">{inProgressCount}</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Currently active</span>
            </div>

            <div className="p-5 bg-white border border-blue-100 rounded-2xl flex flex-col justify-between gap-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Completed</span>
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] text-xs">
                  <i className="fa-solid fa-check"></i>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#111e2e]">{completedCount}</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Ready for scorecard review</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs text-slate-600 px-1 font-bold">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                <span>BACKEND ACTIVITY · Candidate activity updates automatically</span>
              </div>
              <span>Auto-refreshes every 15 seconds</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4 bg-white border border-blue-100 rounded-2xl shadow-sm">
              <div className="lg:col-span-2 relative">
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-xs text-slate-400"></i>
                <input
                  type="text"
                  placeholder="Search candidates by name or email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] font-medium shadow-sm"
                />
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#2563EB] font-medium cursor-pointer shadow-sm"
                >
                  <option value="All">Status: All</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Invited">Invited</option>
                </select>
              </div>

              <div>
                <select
                  value={progressFilter}
                  onChange={(e) => setProgressFilter(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#2563EB] font-medium cursor-pointer shadow-sm"
                >
                  <option value="All">Progress: All</option>
                  <option value="50%">&gt;= 50%</option>
                  <option value="100%">100%</option>
                </select>
              </div>

              <div>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#2563EB] font-medium cursor-pointer shadow-sm"
                >
                  <option value="Latest activity">Sort: Latest activity</option>
                  <option value="Name">Sort: Name</option>
                  <option value="Score">Sort: Score</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-blue-100 rounded-2xl overflow-hidden shadow-sm">
            {loadError && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600 shadow-sm" role="alert">{loadError}</div>}
            {loading && <p className="text-xs font-medium text-slate-500 p-6">Loading candidates from backend…</p>}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-blue-100 text-[10px] text-[#2563EB] uppercase tracking-wider bg-blue-50/50 font-bold">
                    <th className="py-3 px-4">Candidate</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Progress</th>
                    <th className="py-3 px-4">Last activity</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100 text-xs">
                  {filteredCandidates.map((candidate, index) => (
                    <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-lg ${index % 2 === 0 ? "bg-blue-50 border border-blue-200 text-[#2563EB]" : "bg-slate-100 border border-slate-200 text-slate-700"} flex items-center justify-center font-bold text-xs shrink-0 shadow-sm`}>
                            {candidate.initials || (candidate.name ? candidate.name.substring(0, 2).toUpperCase() : "CN")}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-[#111e2e] truncate">{candidate.name}</span>
                            <span className="text-[10px] text-slate-500 font-medium truncate">{candidate.role}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {candidate.email}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${candidate.status === "Completed" ? "bg-[#2563EB]" : "bg-blue-400 animate-pulse"}`}></span>
                          <span className="text-slate-700 font-bold">{candidate.status}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-1 w-36">
                          <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                            <span>{candidate.tasksCompleted || "0 / 6 tasks"}</span>
                            <span>{candidate.percentage || "0%"}</span>
                          </div>
                          <div className="w-full bg-slate-100 border border-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#2563EB] h-full rounded-full" style={{ width: candidate.progressWidth || candidate.percentage || "0%" }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-medium">
                        {candidate.lastActivity || "No activity yet"}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            if (!candidate.attemptId) return;
                            sessionStorage.setItem("currentAttemptId", candidate.attemptId);
                            sessionStorage.setItem("currentCandidateId", candidate.attemptId);
                            navigate(`/recruiter/candidates/${candidate.attemptId}/review`);
                          }}
                          disabled={!candidate.attemptId}
                          className="text-xs text-[#2563EB] hover:underline cursor-pointer disabled:text-slate-400 disabled:cursor-not-allowed bg-transparent border-none font-bold"
                        >
                          {candidate.attemptId ? "View scorecard →" : "Not started"}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCandidates.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-6 text-center text-slate-500 font-medium text-xs">
                        No candidates found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-semibold bg-blue-50/30">
              <span>Showing 1-{filteredCandidates.length} of {candidatesList.length} candidates</span>
            </div>
          </div>

          <footer className="pt-6 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-semibold">
            <div>
              <span className="font-bold text-[#172554]">SmartRecruit</span>
              <span className="text-slate-500">— Recruiter workspace</span>
            </div>
            <div className="flex gap-6 font-bold">
              <span className="hover:text-[#2563EB] cursor-pointer">Security</span>
              <span className="hover:text-[#2563EB] cursor-pointer">Candidate privacy</span>
              <span className="hover:text-[#2563EB] cursor-pointer">Help</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default CandidatesMonitoring;