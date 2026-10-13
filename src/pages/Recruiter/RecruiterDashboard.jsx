import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterProfile from "../Candidate/Recruiter.jpeg";
import logo from "../Candidate/logo.jpeg";
import { api } from "../../services/api";

function RecruiterDashboard() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [recruiterName, setRecruiterName] = useState("Your Name");
    const [stats, setStats] = useState({
        activeAssessments: 0,
        totalCandidates: 0,
        inProgress: 0,
        readyForReview: 0
    });
    const [activeAssessmentsList, setActiveAssessmentsList] = useState([]);
    const [recentActivityList, setRecentActivityList] = useState([]);
    const [dashboardError, setDashboardError] = useState("");

    useEffect(() => {
        let active = true;
        async function fetchDashboardData() {
            try {
                const data = await api("/api/recruiter/dashboard");
                if (!active) return;
                if (data.recruiter?.name) setRecruiterName(data.recruiter.name);
                if (data.stats) setStats(data.stats);
                setActiveAssessmentsList(Array.isArray(data.activeAssessmentsList) ? data.activeAssessmentsList : []);
                setRecentActivityList(Array.isArray(data.recentActivityList) ? data.recentActivityList : []);
                setDashboardError("");
            } catch (error) {
                if (active) setDashboardError(error.message || "Could not load dashboard data from the backend.");
            }
        }
        fetchDashboardData();
        const intervalId = setInterval(fetchDashboardData, 15000);
        return () => { active = false; clearInterval(intervalId); };
    }, []);

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
                                className="h-[35px] px-3 rounded-xl bg-[#193653] text-[#FFFFFF] flex items-center gap-2 whitespace-nowrap transition-colors shrink-0 font-bold w-full text-left border-none cursor-pointer"
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
                                <span className="bg-[#2563EB] text-white font-bold px-1.5 py-0.5 rounded text-[10px]">{stats.totalCandidates}</span>
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
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            navigate("/recruiter/login");
                        }}
                        className="h-[35px] px-3 rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-300 flex items-center gap-2 whitespace-nowrap transition-colors shrink-0 font-bold w-full bg-transparent border-none cursor-pointer"
                    >
                        <i className="fa-solid fa-right-from-bracket text-[15px]"></i>
                        Log out
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFF]">
                {dashboardError && <div className="mx-6 mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600 shadow-sm" role="alert">{dashboardError}</div>}

                <header className="w-full h-[62px] border-b border-slate-200/60 bg-[#F8FAFF] sticky top-0 z-50">
                    <div className="max-w-[1040px] h-full mx-auto px-4 sm:px-8 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                            <span>Recruiter workspace</span>
                            <span>·</span>
                            <span className="text-[#172554] font-bold">Dashboard</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <i className="fa-solid fa-magnifying-glass absolute right-3 top-2.5 text-xs text-slate-400"></i>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-white border border-slate-200 rounded-full pl-3 pr-8 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] transition-all w-44 font-medium shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto w-full p-4 sm:p-8 flex flex-col gap-8 flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">Hiring overview</span>
                            <h1 className="text-3xl sm:text-4xl text-[#111e2e] tracking-tight font-extrabold">Good morning, {recruiterName}.</h1>
                            <p className="text-xs sm:text-sm text-slate-600 font-medium">Here's what's happening across your assessments today.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => navigate("/recruiter/candidates")} className="bg-white hover:bg-blue-50 border border-blue-200 text-[#2563EB] px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm">
                                + Invite candidate
                            </button>
                            <button
                                onClick={() => navigate("/recruiter/assessments/create")}
                                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md shadow-blue-500/20 border-none"
                            >
                                + Create assessment
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-5 bg-white border border-blue-100 rounded-2xl flex flex-col justify-between gap-4 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Active assessments</span>
                                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] text-xs">
                                    <i className="fa-solid fa-file-lines"></i>
                                </div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-3xl font-extrabold text-[#111e2e]">{stats.activeAssessments}</span>
                            </div>
                        </div>

                        <div className="p-5 bg-white border border-blue-100 rounded-2xl flex flex-col justify-between gap-4 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total candidates</span>
                                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] text-xs">
                                    <i className="fa-solid fa-users"></i>
                                </div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-3xl font-extrabold text-[#111e2e]">{stats.totalCandidates}<span className="text-[11px] text-slate-500 font-semibold">  Across all roles</span></span>
                            </div>
                        </div>

                        <div className="p-5 bg-white border border-blue-100 rounded-2xl flex flex-col justify-between gap-4 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">In progress</span>
                                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] text-xs">
                                    <i className="fa-regular fa-clock"></i>
                                </div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-3xl font-extrabold text-[#111e2e]">{stats.inProgress}<span className="text-[11px] text-slate-500 font-semibold">  Currently taking assessments</span></span>
                            </div>
                        </div>

                        <div className="p-5 bg-white border border-blue-100 rounded-2xl flex flex-col justify-between gap-4 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Ready for review</span>
                                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] text-xs">
                                    <i className="fa-solid fa-check"></i>
                                </div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-3xl font-extrabold text-[#111e2e]">{stats.readyForReview}<span className="text-[11px] text-slate-500 font-semibold">  Completed assessments</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white border border-blue-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-bold text-[#111e2e]">Active assessments</h2>
                                        <span className="text-[11px] text-slate-500 font-medium">Current assessments accepting candidate submissions</span>
                                    </div>
                                    <span className="text-xs text-[#2563EB] hover:underline cursor-pointer font-bold">View all <i className="fa-solid fa-arrow-right"></i></span>
                                </div>

                                <div className="grid grid-cols-12 text-[10px] text-slate-500 uppercase tracking-widest py-1 border-b border-blue-100 font-bold">
                                    <span className="col-span-5">Assessment</span>
                                    <span className="col-span-3">Type</span>
                                    <span className="col-span-2">Candidates</span>
                                    <span className="col-span-2 text-right">Status</span>
                                </div>

                                <div className="flex flex-col divide-y divide-blue-100">
                                    {activeAssessmentsList.length === 0 && <p className="py-6 text-center text-xs text-slate-500 font-medium">No assessments have been saved for this recruiter yet.</p>}
                                    {activeAssessmentsList.filter((item) => `${item.name} ${item.details}`.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => (
                                        <div key={idx} className="grid grid-cols-12 items-center py-3.5 hover:bg-blue-50/50 transition-colors px-1 rounded-xl">
                                            <div className="col-span-5 flex items-center gap-3">
                                                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] text-xs shrink-0">
                                                    <i className="fa-solid fa-code"></i>
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-bold text-[#111e2e] text-xs truncate">{item.name}</span>
                                                    <span className="text-[10px] text-slate-500 truncate font-medium">{item.details}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-3 text-xs text-slate-600 font-medium">
                                                {item.type}
                                            </div>
                                            <div className="col-span-2 text-xs font-bold text-[#111e2e]">
                                                {item.candidates}
                                            </div>
                                            <div className="col-span-2 flex items-center justify-end gap-3 text-xs font-semibold">
                                                <div className="flex items-center gap-1.5 border border-blue-200 bg-blue-50/70 rounded-xl px-3 py-1.5 shadow-sm">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                                    <span className="text-slate-700">{item.status}</span>
                                                </div>
                                                <button
                                                    onClick={() => navigate("/recruiter/candidates")}
                                                    className="text-[#2563EB] hover:underline cursor-pointer ml-2 bg-transparent border-none text-xs font-bold"
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 mt-4 border-t border-blue-100 text-[11px] text-slate-500 font-medium">
                                <span>{activeAssessmentsList.length} assessments in workspace</span>
                                <span>Updated a few minutes ago</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="bg-white border border-blue-100 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
                                <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold text-[#111e2e]">Recent activity</h3>
                                        <span className="text-[10px] text-slate-500 font-medium">Latest candidate updates</span>
                                    </div>
                                    <span className="text-[10px] text-[#2563EB] hover:underline cursor-pointer font-bold">See all</span>
                                </div>

                                <div className="flex flex-col gap-3.5">
                                    {recentActivityList.length === 0 && <p className="py-4 text-xs text-slate-500 font-medium">No candidate activity is recorded yet.</p>}
                                    {recentActivityList.map((act, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-xs shrink-0 mt-0.5 text-[#2563EB]">
                                                <i className={act.icon}></i>
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <p className="text-xs text-slate-700 leading-snug font-medium">{act.text}</p>
                                                <span className="text-[10px] text-slate-400 font-medium">{act.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white border border-blue-100 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
                                <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                                    <div className="flex flex-col">
                                        <h3 className="text-lg text-[#111e2e] font-bold">Review queue</h3>
                                        <span className="text-[10px] text-slate-500 font-medium">Based on saved assessment attempts</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                                        <span className="text-[10px] text-[#2563EB] font-bold">{stats.readyForReview} ready</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-3xl font-extrabold text-[#111e2e]">{stats.readyForReview}</p>
                                    <p className="text-xs text-slate-600 font-medium">Submitted or evaluated attempts available for recruiter review.</p>
                                    <button onClick={() => navigate("/recruiter/candidates")} className="self-start mt-2 text-xs text-[#2563EB] hover:underline bg-transparent border-none p-0 cursor-pointer font-bold">Review candidates →</button>
                                </div>
                            </div>
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

export default RecruiterDashboard;