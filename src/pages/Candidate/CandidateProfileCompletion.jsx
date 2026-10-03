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

    const [resumeFile, setResumeFile] = useState(null);
    const [previewState, setPreviewState] = useState("Complete"); // "Complete" or "Validation"

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
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans selection:bg-blue-600 selection:text-white">

            <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-md shadow-blue-500/20">
                        S
                    </div>
                    <div>
                        <span className="font-bold text-sm tracking-tight text-slate-900 block">SmartRecruit</span>
                        <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">CANDIDATE PORTAL</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-2 bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-full text-xs font-medium text-slate-700 shadow-inner">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span>Frontend Developer Recruitment Drive</span>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer">
                        <i className="fa-regular fa-circle-question text-blue-600"></i>
                        <span>Help</span>
                    </button>

                    <div className="flex items-center space-x-2.5 bg-white border border-slate-200 pl-2 pr-3 py-1 rounded-xl shadow-sm">
                        <div className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-bold shadow-sm">
                            {formData.fullName ? formData.fullName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "CP"}
                        </div>
                        <span className="text-xs font-semibold text-slate-800">{formData.fullName || "Candidate"}</span>
                    </div>
                </div>
            </header>

            <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-center md:justify-start space-x-4 text-xs">
                <div className="flex items-center space-x-2 text-slate-500 font-medium">
                    <i className="fa-solid fa-sliders text-blue-600"></i>
                    <span>PROTOTYPE PREVIEW STATE:</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setPreviewState("Complete")}
                        className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${previewState === "Complete"
                                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                                : "bg-slate-100 text-slate-600 hover:text-slate-900"
                            }`}
                    >
                        <i className="fa-solid fa-circle-check text-[10px]"></i>
                        <span>Complete (100%)</span>
                    </button>

                    <button
                        onClick={() => setPreviewState("Validation")}
                        className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${previewState === "Validation"
                                ? "bg-amber-600 text-white shadow-sm shadow-amber-500/20"
                                : "bg-slate-100 text-slate-600 hover:text-slate-900"
                            }`}
                    >
                        <i className="fa-solid fa-triangle-exclamation text-[10px]"></i>
                        <span>Validation Warning</span>
                    </button>
                </div>
            </div>

            <main className="max-w-4xl w-full mx-auto p-4 sm:p-6 my-6 flex-grow">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-8">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-6 gap-4">
                        <div className="space-y-1.5">
                            <div className="flex items-center space-x-2">
                                <span className="text-blue-600 bg-blue-50 border border-blue-200 p-1.5 rounded-lg text-xs">
                                    <i className="fa-solid fa-user-pen"></i>
                                </span>
                                <span className="text-[11px] font-bold tracking-wider uppercase text-blue-600">APPLICATION PROFILE</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Complete your profile</h1>
                            <p className="text-slate-500 text-xs sm:text-sm">
                                Provide your details and resume before starting the assessment. This builds your context dossier for technical evaluation.
                            </p>
                        </div>

                        <div className="self-start sm:self-center bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 shrink-0">
                            Step 1 of 3 • Prior to Assessment
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start space-x-3.5">
                        <div className="w-9 h-9 bg-blue-100 text-blue-600 border border-blue-200 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                            <i className="fa-solid fa-briefcase"></i>
                        </div>
                        <div className="text-xs space-y-1">
                            <p className="font-bold text-slate-900 text-sm">
                                Frontend Developer <span className="text-blue-600 font-normal">· Technical Recruitment Drive</span>
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Your profile information will be shared with the recruiting committee along with your interactive code submissions.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-5 pt-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-base font-bold text-slate-900">Basic Information</h2>
                            <span className="text-[11px] text-slate-500 font-medium">Fields marked with <span className="text-blue-600">*</span> are required</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700 block">
                                    Full Name <span className="text-blue-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors font-medium shadow-inner"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700 block">
                                    Email Address <span className="text-blue-600">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="candidate@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors font-medium shadow-inner"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700 block">
                                    Phone Number <span className="text-blue-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="+91 XXXXX XXXXX"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors font-medium shadow-inner"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700 block">
                                    College / University <span className="text-blue-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="college"
                                    placeholder="Enter your college or university name"
                                    value={formData.college}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors font-medium shadow-inner"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-base font-bold text-slate-900">
                                Resume <span className="text-blue-600">*</span>
                            </h2>
                            <span className="text-[11px] text-slate-500">Upload your latest resume for this recruitment drive</span>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center space-x-3.5 w-full sm:w-auto">
                                <div className="w-10 h-10 bg-blue-100 text-blue-600 border border-blue-200 rounded-xl flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-file-pdf text-lg"></i>
                                </div>
                                <div className="space-y-0.5 overflow-hidden">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                                            {resumeFile ? resumeFile.name : "Upload your resume (PDF)"}
                                        </span>
                                        {resumeFile && (
                                            <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center space-x-1 shrink-0">
                                                <i className="fa-solid fa-check text-[9px]"></i>
                                                <span>Uploaded</span>
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-slate-500">
                                        {resumeFile ? `${(resumeFile.size / (1024 * 1024)).toFixed(1)} MB • Scanned for virus checks` : "PDF Document • Max size 5MB"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                                <label className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-xs font-semibold text-slate-700 rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer shadow-sm">
                                    <i className="fa-solid fa-upload text-[10px]"></i>
                                    <span>{resumeFile ? "Replace" : "Browse File"}</span>
                                    <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
                                </label>
                                {resumeFile && (
                                    <button
                                        type="button"
                                        onClick={() => alert("Previewing resume...")}
                                        className="p-2.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-xl transition-colors cursor-pointer shadow-sm"
                                        title="Preview Resume"
                                    >
                                        <i className="fa-regular fa-eye text-xs"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-base font-bold text-slate-900">GitHub Repository</h2>
                            <span className="text-[11px] text-slate-500">Add your GitHub profile or repository to showcase your technical projects.</span>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-700 block">
                                GitHub URL <span className="text-blue-600">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <i className="fa-brands fa-github text-sm"></i>
                                </span>
                                <input
                                    type="url"
                                    name="githubUrl"
                                    placeholder="https://github.com/your-username/project-repo"
                                    value={formData.githubUrl}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors font-mono shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[11px] text-slate-500 pt-1 gap-2">
                            <span>Use your GitHub profile or a relevant project repository.</span>
                            {formData.githubUrl ? (
                                <span className="bg-blue-50 border border-blue-200 text-blue-600 px-2.5 py-1 rounded-lg font-semibold flex items-center space-x-1">
                                    <i className="fa-solid fa-circle-check text-[10px]"></i>
                                    <span>GitHub link added</span>
                                </span>
                            ) : (
                                <span className="text-slate-400">Optional / Required for portfolio check</span>
                            )}
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between text-xs text-slate-600">
                        <div className="flex items-center space-x-2.5">
                            <i className="fa-solid fa-lock text-blue-600 text-xs"></i>
                            <span>Your resume and GitHub link provide additional candidate context for this recruitment drive.</span>
                        </div>
                        <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy details modal"); }} className="text-blue-600 hover:underline font-semibold shrink-0 ml-2">
                            Privacy details →
                        </a>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">

                        <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl w-full sm:w-auto">
                            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-[10px] font-bold">
                                {Object.values(formData).every(val => val.trim() !== "") && resumeFile ? "100%" : "Draft"}
                            </div>
                            <div className="text-xs">
                                <p className="font-bold text-slate-900 flex items-center space-x-1">
                                    <span>Profile status</span>
                                    <i className="fa-solid fa-circle-check text-emerald-600 text-[10px]"></i>
                                </p>
                                <p className="text-[10px] text-slate-500">
                                    {Object.values(formData).every(val => val.trim() !== "") && resumeFile ? "Ready to continue" : "Please fill required fields"}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/candidate/instructions")}
                            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 cursor-pointer"
                        >
                            <span>Save & Continue</span>
                            <span>→</span>
                        </button>
                    </div>

                </div>
            </main>

            <footer className="bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                    <i className="fa-solid fa-shield-halved text-blue-600"></i>
                    <span>Powered by SmartRecruit Candidate Portal • Secure & Confidential</span>
                </div>

                <div className="flex items-center space-x-6 text-[11px]">
                    <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-900 transition-colors">Candidate Terms</a>
                    <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-900 transition-colors">Privacy Policy</a>
                    <a href="#support" onClick={(e) => e.preventDefault()} className="hover:text-slate-900 transition-colors">Support</a>
                </div>
            </footer>

        </div>
    );
}

export default CandidateProfileCompletion;