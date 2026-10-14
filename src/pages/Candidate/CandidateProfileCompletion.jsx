
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, apiUpload } from "../../services/api";
import logo from "./logo.jpeg";

function CandidateProfileCompletion({ signupName = "" }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: signupName,
        email: "",
        phone: "",
        college: "",
        githubUrl: "",
    });

    const [resumeFile, setResumeFile] = useState(null);
    const [resumeError, setResumeError] = useState("");
    const [saveError, setSaveError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [saving, setSaving] = useState(false);

    // Load the candidate's saved details whenever the page opens.
    useEffect(() => {
        let active = true;

        const loadProfile = async () => {
            try {
                // This backend exposes GET /api/profile, not /api/candidates/me.
                // New users may not have an analyzed CandidateProfile yet, so
                // also load their account details from the existing /api/auth/me.
                let profile = {};
                let account = {};

                try {
                    const response = await api("/api/profile");
                    profile =
                        response?.candidate ||
                        response?.candidateProfile?.candidate ||
                        response?.candidateProfile ||
                        response?.profile ||
                        response?.data ||
                        {};
                } catch (profileError) {
                    // A 404 here can simply mean the candidate has not uploaded
                    // and analyzed a resume yet. Try the account endpoint below.
                    if (!/not found|candidate profile/i.test(profileError.message || "")) {
                        throw profileError;
                    }
                }

                try {
                    const accountResponse = await api("/api/auth/me");
                    account = accountResponse?.user || accountResponse?.data?.user || {};
                } catch (accountError) {
                    // Keep any candidate profile data if the account endpoint
                    // is unavailable, but surface errors if neither source works.
                    if (!Object.keys(profile).length) throw accountError;
                }

                if (!active) return;

                setFormData({
                    fullName: profile.fullName || profile.name || account.name || signupName || "",
                    email: profile.email || account.email || "",
                    phone: profile.phone || account.phone || "",
                    college: profile.college || profile.university || account.college || "",
                    githubUrl: profile.githubUrl || account.githubUrl || "",
                });
            } catch (error) {
                if (active) {
                    setSaveError(
                        error.message || "Could not load your saved profile."
                    );
                }
            } finally {
                if (active) setLoadingProfile(false);
            }
        };

        loadProfile();

        return () => {
            active = false;
        };
    }, [signupName]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setSaveError("");
        setSuccessMessage("");
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const allowedExtensions = /\.(pdf|docx)$/i;
        const maxSize = 10 * 1024 * 1024;

        if (!allowedExtensions.test(file.name)) {
            setResumeError("Please upload a PDF or DOCX file.");
            setResumeFile(null);
            e.target.value = "";
            return;
        }

        if (file.size > maxSize) {
            setResumeError(
                "File size exceeds 10 MB. Please upload a smaller file."
            );
            setResumeFile(null);
            e.target.value = "";
            return;
        }

        setResumeError("");
        setResumeFile(file);
        setSaveError("");
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return "0 Bytes";

        const units = ["Bytes", "KB", "MB", "GB"];
        const index = Math.floor(Math.log(bytes) / Math.log(1024));

        return (
            parseFloat((bytes / Math.pow(1024, index)).toFixed(1)) +
            " " +
            units[index]
        );
    };

    const isFormValid = Boolean(
        formData.fullName.trim() &&
        formData.email.trim() &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
        formData.phone.trim() &&
        formData.college.trim() &&
        !resumeError
    );

    // Save profile details independently from ML analysis.
    const handleSaveAndContinue = async () => {
        if (!isFormValid || saving || loadingProfile) {
            setSaveError("Please enter valid details in all required fields.");
            return;
        }

        setSaving(true);
        setSaveError("");
        setSuccessMessage("");

        try {
            // 1. Save the latest profile details in the backend.
            // Requires the backend to implement PUT /api/profile. The current
            // Backend.zip only implements GET /api/profile and POST /api/profile/analyze.
            await api("/api/profile", {
                method: "PUT",
                body: JSON.stringify({
                    fullName: formData.fullName.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    college: formData.college.trim(),
                    githubUrl: formData.githubUrl.trim(),
                }),
            });

            // 2. Run resume/GitHub analysis only when both are supplied.
            // Profile saving does not depend on this analysis.
            if (resumeFile && formData.githubUrl.trim()) {
                const body = new FormData();
                body.append("resume", resumeFile);
                body.append("githubUrl", formData.githubUrl.trim());

                try {
                    await apiUpload("/api/profile/analyze", body);
                } catch (analysisError) {
                    setSaveError(
                        "Your profile was saved, but resume/GitHub analysis failed. " +
                        (analysisError.message || "Please try again.")
                    );
                    setSaving(false);
                    return;
                }
            }

            setSuccessMessage("Profile updated successfully.");

            // Keep local user information in sync where possible.
            try {
                const user = JSON.parse(
                    localStorage.getItem("user") || "null"
                );

                if (user) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify({
                            ...user,
                            name: formData.fullName.trim(),
                            email: formData.email.trim(),
                            phone: formData.phone.trim(),
                            college: formData.college.trim(),
                            githubUrl: formData.githubUrl.trim(),
                        })
                    );
                }
            } catch {
                // The backend remains the source of truth.
            }

            navigate("/");
        } catch (error) {
            setSaveError(
                error.message || "Could not save your profile. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col"
            style={{
                fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif",
            }}
        >
            <header className="bg-white/90 backdrop-blur-md border-b border-blue-100 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-blue-300/40 overflow-hidden shrink-0">
                        <img
                            src={logo}
                            alt="SmartRecruit Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div>
                        <span className="font-bold text-sm tracking-tight text-[#0F172A] block">
                            SmartRecruit
                        </span>
                        <span className="text-[10px] text-[#2563EB] font-medium tracking-wide uppercase">
                            CANDIDATE PORTAL
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-[#EFF6FF] border border-blue-100 px-2 sm:px-3 py-1 rounded-xl">
                    <div className="w-7 h-7 bg-[#2563EB] text-white rounded-lg flex items-center justify-center text-xs font-bold">
                        {formData.fullName
                            ? formData.fullName
                                  .split(" ")
                                  .map((part) => part[0])
                                  .join("")
                                  .substring(0, 2)
                                  .toUpperCase()
                            : "AP"}
                    </div>

                    <span className="text-xs font-semibold text-[#1E293B] max-w-32 truncate">
                        {formData.fullName || "Your Name"}
                    </span>
                </div>
            </header>

            <div className="bg-white border-b border-blue-100 px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <span className="text-[#2563EB] font-semibold">
                        01 About you
                    </span>
                    <span>/</span>
                    <span>Assessment</span>
                    <span>/</span>
                    <span>Review</span>
                </div>

                <span className="text-slate-500">Step 1 of 3</span>
            </div>

            <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 my-6 flex flex-col lg:flex-row gap-8 flex-grow">
                <div className="flex-grow space-y-8">
                    <div className="space-y-2">
                        <span className="text-[11px] font-bold tracking-wider uppercase text-[#2563EB]">
                            1 CANDIDATE PROFILE & APPLICATION
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tight">
                            Complete your profile.
                        </h1>

                        <p className="text-slate-600 text-xs sm:text-sm">
                            Review and update your details whenever you need
                            to. Your saved information will be loaded the next
                            time you visit.
                        </p>
                    </div>

                    {loadingProfile && (
                        <p className="text-sm text-slate-500">
                            Loading your saved profile...
                        </p>
                    )}

                    <div className="space-y-4 pt-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-base font-bold text-[#0F172A]">
                                Your details
                            </h2>
                            <span className="text-[11px] text-slate-500">
                                <span className="text-[#2563EB]">*</span>{" "}
                                Required
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                {
                                    name: "fullName",
                                    label: "Full name",
                                    placeholder: "Enter your full name",
                                    type: "text",
                                },
                                {
                                    name: "email",
                                    label: "Email address",
                                    placeholder: "candidate@example.com",
                                    type: "email",
                                },
                                {
                                    name: "phone",
                                    label: "Phone number",
                                    placeholder: "+91 XXXXX XXXXX",
                                    type: "tel",
                                },
                                {
                                    name: "college",
                                    label: "College or university",
                                    placeholder: "Enter your college or university",
                                    type: "text",
                                },
                            ].map((field) => (
                                <div
                                    key={field.name}
                                    className="space-y-1.5"
                                >
                                    <label
                                        htmlFor={field.name}
                                        className="text-xs font-semibold text-[#334155] block"
                                    >
                                        {field.label}{" "}
                                        <span className="text-[#2563EB]">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        id={field.name}
                                        type={field.type}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        disabled={loadingProfile || saving}
                                        required
                                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-colors font-medium shadow-sm disabled:bg-slate-50"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center gap-3">
                            <h2 className="text-base font-bold text-[#0F172A]">
                                Your resume
                            </h2>
                            <span className="text-[11px] text-slate-500">
                                PDF or DOCX · up to 10 MB
                            </span>
                        </div>

                        <div
                            className={`bg-white border rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                                resumeError
                                    ? "border-red-500"
                                    : "border-blue-100"
                            }`}
                        >
                            <div className="flex items-center gap-3.5 w-full min-w-0">
                                <div className="w-10 h-10 bg-[#EFF6FF] text-[#2563EB] border border-blue-100 rounded-xl flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-file-pdf text-lg"></i>
                                </div>

                                <div className="min-w-0">
                                    <p className="font-bold text-xs sm:text-sm text-[#0F172A] truncate">
                                        {resumeFile
                                            ? resumeFile.name
                                            : "Choose a resume"}
                                    </p>

                                    <p className="text-[11px] text-slate-500">
                                        {resumeFile
                                            ? `${formatFileSize(
                                                  resumeFile.size
                                              )} · Selected`
                                            : "Select a PDF or DOCX file"}
                                    </p>
                                </div>
                            </div>

                            <label className="text-[#2563EB] hover:underline cursor-pointer text-xs font-semibold shrink-0">
                                {resumeFile ? "Replace file" : "Upload file"}

                                <input
                                    type="file"
                                    accept=".pdf,.docx"
                                    onChange={handleFileUpload}
                                    disabled={saving}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {resumeError && (
                            <p className="text-xs text-red-600 font-medium">
                                {resumeError}
                            </p>
                        )}

                        <p className="text-[11px] text-slate-500">
                            Uploading a new resume for analysis requires a
                            GitHub URL as well.
                        </p>
                    </div>

                    <div className="space-y-3 pt-2">
                        <h2 className="text-base font-bold text-[#0F172A]">
                            Show us what you've built
                        </h2>

                        <label
                            htmlFor="githubUrl"
                            className="text-xs font-semibold text-[#334155] block"
                        >
                            GitHub profile or project
                        </label>

                        <input
                            id="githubUrl"
                            type="url"
                            name="githubUrl"
                            placeholder="https://github.com/your-username/project-repo"
                            value={formData.githubUrl}
                            onChange={handleChange}
                            disabled={loadingProfile || saving}
                            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-colors shadow-sm"
                        />

                        <p className="text-[11px] text-slate-500">
                            You can update your GitHub URL whenever your
                            projects change.
                        </p>
                    </div>

                    <div className="text-xs text-slate-500 flex items-start gap-2">
                        <i className="fa-solid fa-lock text-[#2563EB] mt-0.5"></i>
                        <span>
                            Your details are used for this hiring process.
                        </span>
                    </div>

                    {saveError && (
                        <div
                            role="alert"
                            className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3"
                        >
                            {saveError}
                        </div>
                    )}

                    {successMessage && (
                        <div
                            role="status"
                            className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl p-3"
                        >
                            {successMessage}
                        </div>
                    )}

                    <div className="pt-6 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button
                            type="button"
                            disabled={
                                !isFormValid || saving || loadingProfile
                            }
                            onClick={handleSaveAndContinue}
                            className="w-full sm:w-auto px-6 py-3 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none"
                        >
                            <span>
                                {saving
                                    ? "Saving your profile..."
                                    : "Save profile and continue"}
                            </span>
                            {!saving && <span>→</span>}
                        </button>
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t border-blue-100 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <span>© SmartRecruit · Candidate portal</span>

                <div className="flex items-center gap-5">
                    <a href="#terms" className="hover:text-[#2563EB]">
                        Candidate terms
                    </a>
                    <a href="#privacy" className="hover:text-[#2563EB]">
                        Privacy
                    </a>
                    <a href="#support" className="hover:text-[#2563EB]">
                        Support
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default CandidateProfileCompletion;
