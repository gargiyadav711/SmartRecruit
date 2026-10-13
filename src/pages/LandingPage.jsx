import { useState } from "react";
import { useNavigate } from "react-router-dom";
import landingImage from "./Candidate/landing.jpeg";
import logo from "./Candidate/logo.jpeg";

function LandingPage() {
  const navigate = useNavigate();
  const [initialAuth] = useState(() => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      return {
        isLoggedIn: Boolean(token),
        userName: user?.name || (user?.role === "recruiter" ? "Recruiter" : "Candidate"),
        userRole: user?.role || "candidate",
      };
    } catch {
      return { isLoggedIn: false, userName: "", userRole: "candidate" };
    }
  });
  const [isLoggedIn, setIsLoggedIn] = useState(initialAuth.isLoggedIn);
  const [userName] = useState(initialAuth.userName);
  const [userRole] = useState(initialAuth.userRole);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };
  const featuresList = [
    {
      icon: "fa-solid fa-arrow-right rotate-[-45deg]",
      title: "Guided assessment flow",
      description: "Help candidates prepare, check their setup, and move through each section with clear instructions.",
      action: "See how it works →",
    },
    {
      icon: "fa-solid fa-user-check",
      title: "Candidate profiles",
      description: "Bring technical skills, project links, and assessment responses together in one profile.",
      action: "View the candidate experience →",
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "Secure session controls",
      description: "Set expectations before the assessment and keep session information visible to candidates.",
      action: "Learn about the process →",
    },
    {
      icon: "fa-solid fa-magnifying-glass-chart",
      title: "Evidence-based review",
      description: "Use shared rubrics and reviewer notes to discuss a candidate's work with more context.",
      action: "Explore team review →",
    },
  ];
  return (
    <div
      className="min-h-screen bg-[#F5F7FB] text-[#172554] flex flex-col md:flex-row selection:bg-[#2563EB] selection:text-white scroll-smooth"
      style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
    >
      <style>{`
 @keyframes fadeInUp {
 from {
opacity: 0;
transform: translateY(20px);
}
to {
opacity: 1;
transform: translateY(0);
}
 }
.animate-hero-badge {
animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-hero-title {
animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
 opacity: 0;
}
.animate-hero-desc {
 animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
opacity: 0;
}

.animate-hero-cta {
 animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
opacity: 0;
}
.animate-hero-footer {
animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
opacity: 0;
}

`}</style>
      <aside className="w-full md:w-[240px] h-auto md:h-screen bg-[#142B43] text-slate-400 border-b md:border-b-0 md:border-r border-[#CBD5E1] p-4 flex flex-col justify-between md:sticky md:top-0 shrink-0 overflow-y-auto">
        <div className="flex flex-col gap-5">
          <div
            className="w-full h-[56px] flex items-center justify-between md:justify-start gap-[10px] px-1 pb-4 border-b border-[#CBD5E1]/30 cursor-pointer"
            onClick={() => navigate(userRole === "recruiter" ? "/recruiter/dashboard" : "/")}
          >
            <div className="flex items-center gap-[10px]">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-blue-300/40 shrink-0 overflow-hidden">
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
                <span className="text-[9px] tracking-[1.5px] text-slate-400 uppercase mt-1">
                  Technical Hiring
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="hidden md:block text-[18px] text-[#FFFFFF] tracking-[1.5px] font-medium px-2 mb-1">
              ON THIS PAGE
            </span>

            <nav className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-1 text-[11px] pb-2 md:pb-0 scrollbar-none">
              <a
                href="#overview"
                className="h-[35px] px-3 rounded-xl bg-[#193653] text-[#FFFFFF] flex items-center gap-2 whitespace-nowrap transition-colors font-medium shrink-0"
              >
                <i className="fa-solid fa-house text-[15px]"></i>
                Overview
              </a>

              <a
                href="#features"
                className="h-[35px] px-3 rounded-xl hover:bg-[#193653] hover:text-[#FFFFFF] flex items-center gap-2 whitespace-nowrap transition-colors shrink-0"
              >
                <i className="fa-solid fa-list text-[15px]"></i>
                What we offer
              </a>

              <a
                href="#approach"
                className="h-[35px] px-3 rounded-xl hover:bg-[#193653] hover:text-[#FFFFFF] flex items-center gap-2 whitespace-nowrap transition-colors shrink-0"
              >
                <i className="fa-solid fa-arrow-right text-[15px]"></i>
                Our approach
              </a>

              {isLoggedIn && userRole === "candidate" && (
                <button
                  onClick={() => navigate("/candidate/results")}
                  className="h-[35px] px-3 rounded-xl hover:bg-[#193653] hover:text-[#FFFFFF] flex items-center gap-2 text-left whitespace-nowrap transition-colors shrink-0"
                >
                  <i className="fa-solid fa-square-poll-vertical text-[15px]"></i>
                  View Result
                </button>
              )}

              <a
                href="#contact"
                className="h-[35px] px-3 rounded-xl hover:bg-[#193653] hover:text-[#FFFFFF] flex items-center gap-2 whitespace-nowrap transition-colors shrink-0"
              >
                <i className="fa-solid fa-envelope text-[15px]"></i>
                Contact
              </a>
            </nav>
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-[14px] mt-6">
          <div className="flex flex-col p-[14px] bg-[#1B3651] border border-slate-600/50 rounded-xl gap-2">
            <span className="text-[12px] text-[#3985F5] uppercase tracking-[1px] font-semibold">
              For hiring teams
            </span>
            <p className="text-[14px] text-[#FFFFFF] leading-snug font-medium">
              Make space for better conversations.
            </p>
            <p className="text-[10px] text-slate-400 leading-[1.5]">
              Bringing candidate work and reviewer feedback into one clear process.
            </p>

            <a
              href="#contact"
              className="text-[12px] text-blue-400 hover:text-blue-300 mt-1 transition-colors font-medium"
            >
              Talk with our team →
            </a>
          </div>

          <div className="border-t border-slate-600/50 pt-3 px-1 flex items-center justify-between gap-2 text-[10px] text-slate-400">
            <span>© SmartRecruit</span>
            <button
              onClick={() => navigate("/recruiter/dashboard")}
              className="text-blue-400 hover:text-blue-300 whitespace-nowrap"
            >
              <i className="fa-solid fa-circle text-[5px] mr-1"></i>
              Recruiter portal
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFF]">
        <header className="w-full h-[62px] border-b border-slate-200/60 bg-[#F8FAFF] sticky top-0 z-50">
          <div className="max-w-[1040px] h-full mx-auto px-4 sm:px-8 flex items-center justify-end gap-4">
            <div className="flex items-center gap-4 sm:gap-6">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate(userRole === "recruiter" ? "/recruiter/dashboard" : "/candidate/profile")}
                    className="text-xs sm:text-sm text-slate-600 hover:text-blue-600 transition-colors cursor-pointer font-medium truncate max-w-[120px] sm:max-w-none"
                  >
                    {userName}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-blue-600 bg-transparent border border-blue-400 rounded-lg hover:bg-blue-50 transition-all cursor-pointer"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-4 sm:gap-6">
                  <button
                    onClick={() => navigate("/candidate/SignUpPage")}
                    className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer font-medium"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={() => navigate("/candidate/login")}
                    className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-blue-600 bg-transparent border border-blue-300 rounded-lg hover:bg-blue-50 transition-all cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section
          id="overview"
          className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 md:py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="flex flex-col gap-6 w-full">
              <div className="animate-hero-badge flex items-center gap-2 text-[#2563EB] text-xs uppercase tracking-widest font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                A more thoughtful way to hire
              </div>

              <h1 className="animate-hero-title text-3xl sm:text-5xl lg:text-6xl font-bold text-[#111e2e] leading-[1.1] tracking-tight">
                Assess skills beyond the resume.
              </h1>

              <p className="animate-hero-desc text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                Give candidates a fair chance to show how they think, communicate,
                and build. SmartRecruit brings technical questions, coding exercises,
                and spoken responses into one clear review for your team.
              </p>

              <div className="animate-hero-cta flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() =>
                    navigate(
                      isLoggedIn
                        ? userRole === "recruiter"
                          ? "/recruiter/dashboard"
                          : "/candidate/instructions"
                        : "/candidate/SignUpPage"
                    )
                  }
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-lg font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get started
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-white hover:bg-blue-50 text-black border border-blue-200 px-6 py-3 rounded-lg font-bold tracking-wide transition-all cursor-pointer text-center hover:scale-[1.02] active:scale-[0.98]"
                >
                  Explore the platform
                </button>
              </div>

              <div className="animate-hero-footer flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-lock text-[#2563EB]"></i>
                  Secure sessions
                </span>

                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-check text-[#2563EB]"></i>
                  Consistent review
                </span>

                <span>Candidate-friendly flow</span>
              </div>
            </div>

            <div className="relative w-full flex justify-center lg:justify-end">
              <div className="relative w-full flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[520px]">
                  <img
                    src={landingImage}
                    alt="SmartRecruit technical hiring platform"
                    className="w-full h-[280px] sm:h-[380px] lg:h-[460px] object-cover rounded-2xl"
                    style={{
                      maskImage:
                        "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                    }}
                  />

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/40 via-transparent to-white/20 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-16 border-t border-slate-100">
          <div className="flex flex-col gap-2 mb-10">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              BUILT FOR TECHNICAL TEAMS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111e2e] tracking-tight">
              Everything you need for a clearer review.
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Keep the process focused on useful evidence, clear expectations, and thoughtful decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuresList.map((feature, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 bg-white border border-slate-100 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50/80 text-blue-600 flex items-center justify-center mb-6">
                    <i className={`${feature.icon} text-base`}></i>
                  </div>

                  <h3 className="text-xl sm:text-2xl text-[#111e2e] mb-3 font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-8">
                  <div className="w-12 h-[1px] bg-slate-200/60 mb-4"></div>
                  <div className="flex items-center text-xs text-blue-600 font-medium">
                    <span className="cursor-pointer hover:underline flex items-center gap-1">
                      {feature.action}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="approach" className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-16 border-t border-blue-100">
          <div className="flex flex-col gap-3 mb-10">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
              A simpler screening process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#172554]">
              Less time sorting. More time meeting people.
            </h2>
            <p className="text-sm text-slate-600">
              Move from a crowded inbox to a clear, skills-focused shortlist without losing the human side of hiring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 bg-white border border-blue-100 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#2563EB] uppercase tracking-[0.25em] font-semibold">
                  The familiar challenge
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#172554] mt-2 mb-3 tracking-tight">
                  Too many applications. Too little time.
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  Manual first-pass screening can make it hard to give every candidate a thoughtful review.
                </p>
                <ul className="flex flex-col gap-3 text-xs text-slate-600 font-medium">
                  <li className="flex items-center gap-2">Repeated résumé checks</li>
                  <li className="flex items-center gap-2">Slow, inconsistent shortlisting</li>
                  <li className="flex items-center gap-2">Good work can be easy to miss</li>
                </ul>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-[#EFF6FF] border border-blue-200 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#2563EB] uppercase tracking-[0.25em] font-semibold">
                  A clearer way forward
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#172554] mt-2 mb-3 tracking-tight">
                  Review relevant work together.
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  Bring role-based responses and shared reviewer feedback into one place.
                </p>
                <ul className="flex flex-col gap-3 text-xs text-slate-600 font-medium">
                  <li className="flex items-center gap-2"><i className="fas fa-check text-[#2563EB]"></i> Compare candidates against criteria</li>
                  <li className="flex items-center gap-2"><i className="fas fa-check text-[#2563EB]"></i> See technical & coding responses</li>
                  <li className="flex items-center gap-2"><i className="fas fa-check text-[#2563EB]"></i> Make room for better conversations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-12">
          <div className="p-6 sm:p-10 bg-[#edf3fd] border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col gap-2 text-left">
              <span className="text-xs sm:text-sm text-slate-600 font-normal">
                For engineering teams
              </span>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#111e2e] tracking-tight">
                Ready for a more useful first review?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                See how SmartRecruit can fit your team's hiring process.
              </p>
            </div>

            <button className="w-full sm:w-auto px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-medium rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer shadow-sm">
              Get started &rarr;
            </button>
          </div>
        </section>

        <footer
          id="contact"
          className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 uppercase tracking-wider"
        >
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="font-bold text-[#172554]">SmartRecruit</span>
            <span className="text-slate-500">— Technical hiring workspace</span>
          </div>
          <div className="flex gap-6 font-medium">
            <a href="#" className="hover:text-[#2563EB] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#2563EB] transition-colors">Terms</a>
            <a href="#overview" className="hover:text-[#2563EB] transition-colors">Contact</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default LandingPage;