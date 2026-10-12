import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [userName, setUserName] = useState(initialAuth.userName);
  const [userRole, setUserRole] = useState(initialAuth.userRole);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserRole("candidate");
    setUserName("");
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
    <div className="min-h-screen bg-[#F5F7FB] text-[#172554] flex flex-col md:flex-row selection:bg-[#2563EB] selection:text-white scroll-smooth font-sans">

      <aside className="w-full md:w-[240px] h-auto md:h-[800px] bg-[#142B43] text-slate-400 border-b md:border-b-0 md:border-r border-[#CBD5E1] pt-[23px] pr-[17px] pb-[18px] pl-[17px] flex flex-col justify-between md:sticky md:top-0 shrink-0">
        <div className="flex flex-col gap-5">
          <div
            className="w-full h-[56px] flex items-start gap-[10px] px-[6px] pb-[20px] border-b border-[#CBD5E1] cursor-pointer"
            onClick={() => navigate(userRole === "recruiter" ? "/recruiter/dashboard" : "/")}>
            <div className="w-9 h-9 bg-[#2866B9] text-white rounded-xl flex items-center justify-center font-black text-sm border border-blue-300/40 shrink-0">
              S
            </div>

            <div className="flex flex-col pt-1">
              <span className="text-base font-bold tracking-tight text-[#FFFFFF] leading-none">
                SmartRecruit
              </span>

              <span className="text-[9px] font-mono tracking-[1.5px] text-slate-500 uppercase mt-2">
                Technical Hiring
              </span>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-2">
            <span className="text-[9px] font-mono text-slate-400 tracking-[1.5px] font-normal px-2 mb-1">
              ON THIS PAGE
            </span>

            <nav className="flex flex-col gap-1 text-[10px] font-mono">

              <a
                href="#overview"
                className="h-[35px] px-3 rounded-xl bg-[#193653] text-[#3985F5] flex items-center gap-3 transition-colors"
              >
                <i className="fa-solid fa-house text-[9px] w-3"></i>
                Overview
              </a>

              <a
                href="#features"
                className="h-[35px] px-3 rounded-xl hover:bg-[#193653] hover:text-[#3985F5] flex items-center gap-3 transition-colors"
              >
                <i className="fa-solid fa-list text-[9px] w-3"></i>
                What we offer
              </a>

              <a
                href="#approach"
                className="h-[35px] px-3 rounded-xl hover:bg-[#193653] hover:text-[#3985F5] flex items-center gap-3 transition-colors"
              >
                <i className="fa-solid fa-arrow-right text-[9px] w-3"></i>
                Our approach
              </a>

              {isLoggedIn && userRole === "candidate" && (
                <button
                  onClick={() => navigate("/candidate/results")}
                  className="h-[35px] px-3 rounded-xl hover:bg-[#193653] hover:text-[#3985F5] flex items-center gap-3 text-left transition-colors"
                >
                  <i className="fa-solid fa-square-poll-vertical text-[9px] w-3"></i>
                  View Result
                </button>
              )}

              <a
                href="#contact"
                className="h-[35px] px-3 rounded-xl hover:bg-[#193653] hover:text-[#3985F5] flex items-center gap-3 transition-colors"
              >
                <i className="fa-solid fa-envelope text-[9px] w-3"></i>
                Contact
              </a>

            </nav>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-[14px]">

          <div className="flex flex-col p-[14px] bg-[#1B3651] border border-slate-300 rounded-xl gap-2 min-h-[161px]">

            <span className="text-[9px] font-mono text-[#3985F5] uppercase tracking-[1px]">
              For hiring teams
            </span>

            <p className="text-[15px] font-serif text-[#1FFFFFF] leading-snug">
              Make space for better conversations.
            </p>

            <p className="text-[9px] text-slate-400 leading-[1.5]">
              Bring candidate work and reviewer feedback into one clear process.
            </p>

            <a
              href="#contact"
              className="text-[9px] font-mono text-blue-400 hover:text-blue-300 mt-1 transition-colors"
            >
              Talk with our team →
            </a>
          </div>

          <div className="border-t border-slate-300 pt-3 px-1 flex items-center justify-between gap-2 text-[8px] font-mono text-slate-400">
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
        <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFF]">
          <header className="w-full h-[62px] border-b border-slate-200/60 bg-[#f8faef]/30 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-[1040px] h-full mx-auto px-[51.2px] flex items-center justify-between gap-4">

              <div className="flex items-center gap-6 ml-auto">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => navigate(userRole === "recruiter" ? "/recruiter/dashboard" : "/candidate/profile")}
                      className="text-sm font-sans text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {userName}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm font-sans font-medium text-blue-600 bg-transparent border border-blue-400 rounded-lg hover:bg-blue-50 transition-all cursor-pointer"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => navigate("/candidate/SignUpPage")}
                      className="text-sm font-sans text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      Sign up
                    </button>
                    <button
                      onClick={() => navigate("/candidate/login")}
                      className="px-4 py-2 text-sm font-sans font-medium text-blue-600 bg-transparent border border-blue-300 rounded-lg hover:bg-blue-50 transition-all cursor-pointer"
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>
        </div>

        <section id="overview" className="max-w-5xl mx-auto w-full px-6 py-16 md:py-24 flex flex-col justify-center gap-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex flex-col gap-6 max-w-xl w-full lg:w-1/2">
              <div className="flex items-center gap-2 text-[#2563EB] text-xs font-mono uppercase tracking-widest font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                A more thoughtful way to hire
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#111e2e] leading-[1.1] tracking-tight">
                Assess skills beyond
                the résumé.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                Give candidates a fair chance to show how they think, communicate, and build.SmartRecruit brings technical questions, coding exercises, and spoken responses into one clear review for your team.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate(isLoggedIn ? (userRole === "recruiter" ? "/recruiter/dashboard" : "/candidate/instructions") : "/candidate/SignUpPage")}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-lg font-mono font-bold tracking-wider transition-all cursor-pointer"
                >
                  Get started<i className="fa-solid fa-arrow-right text-xs"></i>
                </button>
                <button
                  onClick={() => {
                    const featuresEl = document.getElementById("features");
                    featuresEl?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-white hover:bg-blue-50 text-[black] border border-blue-200 px-6 py-3 rounded-lg font-mono font-bold tracking-wider transition-all cursor-pointer"
                >
                  Explore the platform
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                <span className="flex items-center gap-1.5"><i className="fa-solid fa-lock text-[#2563EB]"></i> Secure sessions</span>
                <span className="flex items-center gap-1.5"><i className="fa-solid fa-check text-[#2563EB]"></i> Consistent review</span>
                <span className="flex items-center gap-1.5"> Candidate-friendly flow</span>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center items-center relative">
            </div>
          </div>
        </section>
        <section id="features" className="max-w-6xl mx-auto w-full px-6 py-20 border-t border-slate-100">
          <div className="flex flex-col gap-2 mb-12">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest">
              BUILT FOR TECHNICAL TEAMS
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif text-[#111e2e] tracking-tight">
              Everything you need for a clearer review.
            </h2>
            <p className="text-sm font-sans text-slate-500 mt-1">
              Keep the process focused on useful evidence, clear expectations, and thoughtful decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuresList.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white border border-slate-100 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50/80 text-blue-600 flex items-center justify-center mb-6">
                    <i className={`${feature.icon} text-base`}></i>
                  </div>

                  <h3 className="text-2xl font-serif text-[#111e2e] mb-3 font-normal">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed font-sans">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-8">
                  <div className="w-12 h-[1px] bg-slate-200/60 mb-4"></div>
                  <div className="flex items-center text-xs font-sans text-blue-600 font-medium">
                    <span className="cursor-pointer hover:underline flex items-center gap-1">
                      {feature.action} &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="approach" className="max-w-5xl mx-auto w-full px-6 py-20 border-t border-blue-100">
          <div className="flex flex-col gap-3 mb-12">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
              A simpler screening process
            </span>
            <h2 className="text-4xl sm:text-5xl tracking-tight text-[#172554]">
              Less time sorting. More time meeting people.
            </h2>
            <p className="text-sm text-slate-600">
              Move from a crowded inbox to a clear, skills-focused shortlist without losing the human side of hiring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-white border border-blue-100 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#2563EB] uppercase tracking-[0.25em] font-semibold">
                  The familiar challenge
                </span>
                <h3 className="text-xl text-[#172554] mt-2 mb-3 tracking-tight">
                  Too many applications. Too little time.
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  Manual first-pass screening can make it hard to give every candidate a thoughtful review.
                </p>
                <ul className="flex flex-col gap-3 text-xs font-mono text-slate-600">
                  <li className="flex items-center gap-2">Repeated résumé checks</li>
                  <li className="flex items-center gap-2">Slow, inconsistent shortlisting</li>
                  <li className="flex items-center gap-2">Good work can be easy to miss</li>
                </ul>
              </div>
            </div>

            <div className="p-8 bg-[#EFF6FF] border border-blue-200 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#2563EB] uppercase tracking-[0.25em] font-semibold">
                  A clearer way forward
                </span>
                <h3 className="text-xl text-[#172554] mt-2 mb-3 tracking-tight">
                  Review relevant work together.
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  Bring role-based responses and shared reviewer feedback into one place.
                </p>
                <ul className="flex flex-col gap-3 text-xs font-mono text-slate-600">
                  <li className="flex items-center gap-2"><i className="fas fa-check text-[#2563EB]"></i> Compare candidates against the same role criteria</li>
                  <li className="flex items-center gap-2"><i className="fas fa-check text-[#2563EB]"></i> See technical, spoken, and coding responses together</li>
                  <li className="flex items-center gap-2"><i className="fas fa-check text-[#2563EB]"></i> Make room for better-informed conversations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto w-full px-6 py-16">
          <div className="p-10 bg-[#edf3fd] border border-blue-100 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-2 text-left">
              <span className="text-sm font-sans text-slate-600 font-normal">
                For engineering teams
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111e2e] tracking-tight">
                Ready for a more useful first review?
              </h3>
              <p className="text-xs text-slate-500 font-sans mt-1">
                See how SmartRecruit can fit your team's hiring process.
              </p>
            </div>

            <button className="px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-sans font-medium rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer shadow-sm">
              Get started &rarr;
            </button>
          </div>
        </section>

        <footer
          id="contact"
          className="max-w-5xl mx-auto w-full px-6 py-10 border-t border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 uppercase tracking-wider"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#172554]">SmartRecruit</span>
            <span className="text-slate-500">— Technical hiring workspace</span>
          </div>

          <div className="flex gap-6">
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