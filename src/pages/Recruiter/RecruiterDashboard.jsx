import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterProfile from "../Candidate/Recruiter.jpeg";
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
            className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col md:flex-row selection:bg-[#2563EB] selection:text-white scroll-smooth"
            style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
        >
            <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-blue-100 bg-white p-6 flex flex-col justify-between md:sticky md:top-0 md:h-screen shrink-0 shadow-sm">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/recruiter/dashboard")}>
                        <div className="w-7 h-7 bg-[#2563EB] text-white rounded-lg flex items-center justify-center font-black text-sm shadow-md shadow-blue-500/20">
                            S
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-bold tracking-tight text-[#0F172A] leading-none">
                                SmartRecruit
                            </span>
                            <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mt-1">
                                Recruiter Workspace
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-[#EFF6FF] border border-blue-100 rounded-2xl gap-3">
                        <div className="w-16 h-16 rounded-full bg-[#E2E8F0] border-2 border-blue-300 overflow-hidden flex items-center justify-center relative shadow-inner">
                            <img
                                src={RecruiterProfile}
                                alt="Recruiter profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-blue-100 rounded-xl">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-sm">
                                {recruiterName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold text-[#0F172A] truncate">{recruiterName}</span>
                                <span className="text-[10px] text-slate-500 truncate font-semibold">Lead technical recruiter</span>
                            </div>
                        </div>
                        <button className="text-slate-400 hover:text-[#0F172A] cursor-pointer px-1 bg-transparent border-none">
                            <i className="fa-solid fa-ellipsis text-xs"></i>
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 bg-blue-50/50 border border-blue-100 rounded-2xl p-3.5">
                        <span className="text-[10px] font-bold text-[#0F172A] uppercase tracking-widest mb-1">
                            Workspace
                        </span>
                        <button
                            className="flex items-center gap-3 text-xs text-[#2563EB] bg-blue-50 border border-blue-200 py-2.5 px-3 rounded-xl font-bold text-left cursor-pointer border-none"
                        >
                            <i className="fa-solid fa-chart-pie text-xs"></i> Dashboard
                        </button>
                        <button
                            onClick={() => navigate("/recruiter/candidates")}
                            className="flex items-center justify-between text-xs text-slate-600 hover:text-[#0F172A] py-2 px-3 rounded-xl hover:bg-blue-50 transition-colors text-left cursor-pointer border-none bg-transparent font-semibold"
                        >
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-user text-xs"></i> Candidates
                            </div>
                            <span className="bg-[#2563EB] text-white font-bold px-1.5 py-0.5 rounded text-[10px]">{stats.totalCandidates}</span>
                        </button>
                        <button
                            onClick={() => navigate("/recruiter/assessments/create")}
                            className="flex items-center gap-3 text-xs text-slate-600 hover:text-[#0F172A] py-2 px-3 rounded-xl hover:bg-blue-50 transition-colors text-left cursor-pointer border-none bg-transparent font-semibold"
                        >
                            <i className="fa-solid fa-file-lines text-xs"></i> Assessments
                        </button>
                        <button
                            className="flex items-center gap-3 text-xs text-slate-600 hover:text-[#0F172A] py-2 px-3 rounded-xl hover:bg-blue-50 transition-colors text-left cursor-pointer border-none bg-transparent font-semibold"
                        >
                            <i className="fa-solid fa-code text-xs"></i> Open roles
                        </button>
                        <button
                            className="flex items-center gap-3 text-xs text-slate-600 hover:text-[#0F172A] py-2 px-3 rounded-xl hover:bg-blue-50 transition-colors text-left cursor-pointer border-none bg-transparent font-semibold"
                        >
                            <i className="fa-solid fa-chart-bar text-xs"></i> Reports
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        navigate("/recruiter/login");
                    }}
                    className="flex items-center gap-3 text-xs font-bold text-red-600 hover:text-red-700 py-2.5 px-3 rounded-xl hover:bg-red-50 transition-colors text-left cursor-pointer bg-transparent border-none"
                >
                    <i className="fa-solid fa-right-from-bracket text-xs"></i> Log out
                </button>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
                {dashboardError && <div className="mx-6 mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600 shadow-sm" role="alert">{dashboardError}</div>}

                <header className="w-full border-b border-blue-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <span>Recruiter workspace</span>
                        <span>·</span>
                        <span className="text-[#0F172A] font-semibold">Dashboard</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <i className="fa-solid fa-magnifying-glass absolute right-3 top-2.5 text-xs text-slate-400"></i>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-slate-50 border border-slate-300 rounded-full pl-3 pr-8 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] transition-all w-44 font-medium"
                            />
                        </div>
                    </div>
                </header>

                <div className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Hiring overview</span>
                            <h1 className="text-3xl sm:text-4xl text-[#0F172A] tracking-tight font-extrabold">Good morning, {recruiterName}.</h1>
                            <p className="text-xs text-slate-600">Here's what's happening across your assessments today.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => navigate("/recruiter/candidates")} className="bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#2563EB] px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm">
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
                                <div className="text-slate-400 text-xs">
                                    <i className="fa-solid fa-file-lines"></i>
                                </div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-3xl font-bold text-[#0F172A]">{stats.activeAssessments}</span>
                            </div>
                        </div>

                        <div className="p-5 bg-white border border-blue-100 rounded-2xl flex flex-col justify-between gap-4 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total candidates</span>
                                <div className="text-slate-400 text-xs">
                                    <i className="fa-solid fa-users"></i>
                                </div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-3xl font-bold text-[#0F172A]">{stats.totalCandidates}<span className="text-[11px] text-slate-500 font-semibold">  Across all roles</span></span>
                            </div>
                        </div>

                        <div className="p-5 bg-white border border-blue-100 rounded-2xl flex flex-col justify-between gap-4 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">In progress</span>
                                <div className="text-slate-400 text-xs">
                                    <i className="fa-regular fa-clock"></i>
                                </div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-3xl font-bold text-[#0F172A]">{stats.inProgress}<span className="text-[11px] text-slate-500 font-semibold">  Currently taking assessments</span></span>
                            </div>
                        </div>

                        <div className="p-5 bg-white border border-blue-100 rounded-2xl flex flex-col justify-between gap-4 shadow-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Ready for review</span>
                                <div className="text-[#2563EB] text-xs">
                                    <i className="fa-solid fa-check"></i>
                                </div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-3xl font-bold text-[#0F172A]">{stats.readyForReview}<span className="text-[11px] text-slate-500 font-semibold">  Completed assessments</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white border border-blue-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-bold text-[#0F172A]">Active assessments</h2>
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
                                                    <span className="font-bold text-[#0F172A] text-xs truncate">{item.name}</span>
                                                    <span className="text-[10px] text-slate-500 truncate font-medium">{item.details}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-3 text-xs text-slate-600 font-medium">
                                                {item.type}
                                            </div>
                                            <div className="col-span-2 text-xs font-bold text-[#0F172A]">
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
                                        <h3 className="text-lg font-bold text-[#0F172A]">Recent activity</h3>
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
                                        <h3 className="text-lg text-[#0F172A] font-bold">Review queue</h3>
                                        <span className="text-[10px] text-slate-500 font-medium">Based on saved assessment attempts</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                                        <span className="text-[10px] text-[#2563EB] font-bold">{stats.readyForReview} ready</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-3xl font-bold text-[#0F172A]">{stats.readyForReview}</p>
                                    <p className="text-xs text-slate-600 font-medium">Submitted or evaluated attempts available for recruiter review.</p>
                                    <button onClick={() => navigate("/recruiter/candidates")} className="self-start mt-2 text-xs text-[#2563EB] hover:underline bg-transparent border-none p-0 cursor-pointer font-bold">Review candidates →</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="pt-6 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
                        <div>
                            <span>SmartRecruit · Recruiter workspace</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="hover:text-[#0F172A] cursor-pointer">Security</span>
                            <span>·</span>
                            <span className="hover:text-[#0F172A] cursor-pointer">Candidate privacy</span>
                            <span>·</span>
                            <span className="hover:text-[#0F172A] cursor-pointer">Help</span>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
}

export default RecruiterDashboard;