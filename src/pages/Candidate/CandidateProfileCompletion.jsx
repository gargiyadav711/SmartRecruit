import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CandidateProfileCompletion() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        college: "",
        githubUrl: ""
    });

    const [resumeFile, setResumeFile] = useState({
        name: "",
        size: 2.5 * 1024 * 1024
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    return (
        <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-black">
            <header className="bg-[#161b22] border-b border-[#30363d] px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-black text-xs shadow-md shadow-emerald-500/20">
                        S
                    </div>
                    <div>
                        <span className="font-bold text-sm tracking-tight text-white block">SmartRecruit</span>
                        <span className="text-[10px] text-[#8b949e] font-medium tracking-wide uppercase">CANDIDATE PORTAL</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-2 text-xs font-medium text-[#c9d1d9]">
                    <span>Frontend Developer · Recruitment drive</span>
                </div>

                <div className="flex items-center space-x-2.5 bg-[#21262d] border border-[#30363d] pl-2 pr-3 py-1 rounded-xl shadow-sm">
                    <div className="w-7 h-7 bg-emerald-500 text-black rounded-lg flex items-center justify-center text-xs font-bold">
                        {formData.fullName ? formData.fullName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "AP"}
                    </div>
                    <span className="text-xs font-semibold text-white">{formData.fullName || "Abhinayak Pandey"}</span>
                </div>
            </header>

            <div className="bg-[#161b22] border-b border-[#30363d] px-6 py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-[#8b949e] font-medium">
                    <span className="text-emerald-400 font-semibold">01 About you</span>
                    <span>/</span>
                    <span>Assessment</span>
                    <span>/</span>
                    <span>Review</span>
                </div>
                <div className="text-[#8b949e]">
                    Step 1 of 3
                </div>
            </div>
            <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 my-6 flex flex-col lg:flex-row gap-8 flex-grow">
                <div className="flex-grow space-y-8">
                    <div className="space-y-2">
                        <span className="text-[11px] font-bold tracking-wider uppercase text-[#8b949e]">1 CANDIDATE PROFILE & APPLICATION</span>
                        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Complete your profile.</h1>
                        <p className="text-[#8b949e] text-xs sm:text-sm">
                            A few details help the hiring team put your work in context. You can review everything before you continue.
                        </p>
                    </div>

                    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 flex items-start space-x-3.5">
                        <div className="w-8 h-8 bg-[#21262d] text-emerald-400 border border-[#30363d] rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                            <i className="fa-solid fa-laptop-code text-xs"></i>
                        </div>
                        <div className="text-xs space-y-1">
                            <p className="font-bold text-white text-sm">
                                Frontend Developer <span className="text-[#8b949e] font-normal">Technical Recruitment Drive</span>
                            </p>
                            <p className="text-[#8b949e] leading-relaxed">
                                Your profile will be shared with the recruiting team alongside your assessment.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4 pt-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-base font-bold text-white">Your details</h2>
                            <span className="text-[11px] text-[#8b949e]"><span>*</span> Required</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#c9d1d9] block">
                                    Full name <span className="text-emerald-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full bg-[#161b22] border border-[#30363d] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#8b949e] focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#c9d1d9] block">
                                    Email address <span className="text-emerald-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="candidate@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-[#161b22] border border-[#30363d] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#8b949e] focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#c9d1d9] block">
                                    Phone number <span className="text-emerald-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="+91 XXXXX XXXXX"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-[#161b22] border border-[#30363d] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#8b949e] focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#c9d1d9] block">
                                    College or university <span className="text-emerald-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="college"
                                    placeholder="Enter your college or university name"
                                    value={formData.college}
                                    onChange={handleChange}
                                    className="w-full bg-[#161b22] border border-[#30363d] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#8b949e] focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-base font-bold text-white">Your resume</h2>
                            <span className="text-[11px] text-[#8b949e]">PDF or DOCX · up to 10 MB</span>
                        </div>

                        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center space-x-3.5 w-full sm:w-auto">
                                <div className="w-10 h-10 bg-[#21262d] text-emerald-400 border border-[#30363d] rounded-xl flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-file-pdf text-lg"></i>
                                </div>
                                <div className="space-y-0.5 overflow-hidden">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-bold text-xs sm:text-sm text-white truncate">
                                            {resumeFile ? resumeFile.name : "Upload your resume (PDF)"}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-[#8b949e]">
                                        PDF · 2.4 MB · Uploaded just now
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end text-xs font-semibold">
                                <label className="text-emerald-400 hover:underline cursor-pointer">
                                    <span>Replace file</span>
                                    <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} className="hidden" />
                                </label>
                                <span className="text-[#30363d]">|</span>
                                <button
                                    type="button"
                                    onClick={() => alert("Previewing resume...")}
                                    className="text-emerald-400 hover:underline cursor-pointer bg-transparent border-none"
                                >
                                    Preview
                                </button>
                                <span className="text-emerald-400 flex items-center space-x-1 ml-2">
                                    <i className="fa-solid fa-check text-[10px]"></i>
                                    <span>Ready</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-base font-bold text-white">Show us what you've built</h2>
                            <span className="text-[11px] text-[#8b949e]">Optional</span>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-[#c9d1d9] block">
                                GitHub profile or project
                            </label>
                            <input
                                type="url"
                                name="githubUrl"
                                placeholder="https://github.com/your-username/project-repo"
                                value={formData.githubUrl}
                                onChange={handleChange}
                                className="w-full bg-[#161b22] border border-[#30363d] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#8b949e] focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                            />
                        </div>

                        <div className="text-[11px] text-[#8b949e] pt-1">
                            Share a profile or one project you're proud of.
                        </div>
                    </div>

                    <div className="text-xs text-[#8b949e] flex items-center space-x-1 pt-1">
                        <i className="fa-solid fa-lock text-[10px]"></i>
                        <span>Your details stay within this hiring process.</span>
                        <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy details modal"); }} className="text-emerald-400 hover:underline ml-1">
                            How we use your information →
                        </a>
                    </div>

                    <div className="pt-6 border-t border-[#30363d] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs">
                            <p className="font-bold text-white">Saved as you go</p>
                            <p className="text-[11px] text-[#8b949e]">You can come back to finish later.</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/candidate/instructions")}
                            className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center space-x-2 cursor-pointer"
                        >
                            <span>Save and continue</span>
                            <span>→</span>
                        </button>
                    </div>

                </div>

                <div className="w-full lg:w-80 space-y-6 shrink-0">
                    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-500 text-black rounded-xl flex items-center justify-center font-bold text-xs">
                                AP
                            </div>
                            <div>
                                <span className="font-bold text-sm text-white block">Abhinayak Pandey</span>
                                <span className="text-xs text-[#8b949e]">Candidate</span>
                            </div>
                        </div>

                        <div className="border-t border-[#30363d] pt-4 space-y-2">
                            <h3 className="font-bold text-xs text-white uppercase tracking-wider">A note from the team</h3>
                            <p className="text-xs text-[#8b949e] leading-relaxed">
                                Thanks for taking the time to apply. Your profile gives us a little context before we see your work.
                            </p>
                            <div className="pt-1">
                                <a href="#help" onClick={(e) => { e.preventDefault(); alert("Talk to our team"); }} className="text-emerald-400 text-xs hover:underline inline-flex items-center space-x-1">
                                    <span>Need help? Talk to our team</span>
                                    <span>→</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 space-y-4">
                        <h3 className="font-bold text-xs text-white uppercase tracking-wider">Your application</h3>
                        
                        <div className="space-y-3 text-xs">
                            <div className="flex items-center justify-between text-[#c9d1d9]">
                                <div className="flex items-center space-x-2.5">
                                    <i className="fa-regular fa-circle-check text-emerald-400"></i>
                                    <span>Contact details</span>
                                </div>
                                <span className="text-[#8b949e]">Done</span>
                            </div>

                            <div className="flex items-center justify-between text-[#c9d1d9]">
                                <div className="flex items-center space-x-2.5">
                                    <i className="fa-regular fa-circle-check text-emerald-400"></i>
                                    <span>Resume</span>
                                </div>
                                <span className="text-[#8b949e]">Added</span>
                            </div>

                            <div className="flex items-center justify-between text-[#8b949e]">
                                <div className="flex items-center space-x-2.5">
                                    <i className="fa-regular fa-square text-[#8b949e]"></i>
                                    <span>Assessment</span>
                                </div>
                                <span>Next</span>
                            </div>
                        </div>

                        <div className="border-t border-[#30363d] pt-3 text-[11px] text-[#8b949e]">
                            Your progress is saved automatically.
                        </div>
                    </div>
                </div>

            </main>

            <footer className="bg-[#161b22] border-t border-[#30363d] px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8b949e]">
                <div className="flex items-center space-x-2">
                    <span>© SmartRecruit · Candidate portal</span>
                </div>

                <div className="flex items-center space-x-6 text-xs">
                    <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Candidate terms</a>
                    <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Privacy</a>
                    <a href="#support" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Support</a>
                </div>
            </footer>

        </div>
    );
}

export default CandidateProfileCompletion;