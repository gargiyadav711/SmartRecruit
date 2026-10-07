import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Check if the user has logged in or not
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token) {
      setIsLoggedIn(true);
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          setUserName(parsedUser.name || "Candidate");
        } catch (e) {
          setUserName("Candidate");
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const featuresList = [
    {
      title: "Smart Assessment Flow",
      description: "Direct routing from dashboard to guided assessment instructions, ensuring candidates are fully prepped before testing.",
    },
    {
      title: "Candidate Profiles",
      description: "Dedicated profile workspaces with interactive edit modes to keep technical skills, experience, and bios up to date.",
    },
    { title: "Secure Session Control",
      description: "Token-backed authentication with persistent local storage handling, ensuring smooth login, logout, and state tracking.",
    },
    {
      title: "Last-Mile Sign-Off",
      description: "Turn almost-qualified applicants into confirmed, evaluated, and locked hires with a verification process everyone trusts.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between selection:bg-[#10B981] selection:text-white scroll-smooth">
      <header className="w-full border-b border-slate-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-9 h-9 bg-[#10B981] text-white rounded-xl flex items-center justify-center font-black text-xl shadow-md shadow-emerald-500/20">
              S
            </div>
            <span className="text-xl font-bold tracking-tight lowercase">
              <span className="text-white font-extrabold">Smart</span>
              <span className="text-[#10B981]">Recruit</span>
              <span className="text-[#10B981]">.</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-mono text-slate-400">
            <a href="#about" className="hover:text-[#10B981] transition-colors">About</a>
            <a href="#features" className="hover:text-[#10B981] transition-colors">Features</a>
            <a href="#contact" className="hover:text-[#10B981] transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <button onClick={() => navigate("/candidate/profile")} 
                  className="text-sm font-mono text-slate-300 hover:text-[#10B981] px-3 py-2 transition-colors cursor-pointer"
                >
                {userName}
                </button>
                <button onClick={handleLogout}
                  className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all border border-red-500/30 cursor-pointer"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button  onClick={() => navigate("/candidate/SignUpPage")}
                  className="text-sm font-mono text-slate-400 hover:text-[#10B981] px-3 py-2 transition-colors cursor-pointer">
                  Sign Up
                </button>
                <button onClick={() => navigate("/candidate/login")}
                  className="bg-[#10B981] hover:bg-emerald-600 text-white px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm shadow-emerald-500/20 cursor-pointer">
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      <section id="about" className="max-w-6xl mx-auto w-full px-6 min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter lowercase leading-none flex items-center flex-wrap">
            <span className="text-white">Smart</span>
            <span className="text-[#10B981]">Recruit</span>
            <span className="inline-block w-4 h-4 sm:w-6 sm:h-6 bg-[#10B981] rounded-full ml-2 mb-10 sm:mb-16"></span>
          </h1>
          <p className="text-lg sm:text-2xl text-slate-400 max-w-3xl font-normal leading-relaxed mt-2">
            A poster-grade system for the last mile of hiring: turn{" "}
            <span className="text-white font-semibold underline decoration-[#10B981] underline-offset-4">
              almost qualified
            </span>
            into confirmed, assessed, and locked, with a sign-off everyone trusts.
          </p>
          {isLoggedIn && (
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-2xl">
              <div className="flex-1 flex items-center justify-between p-5 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-sm">
                <div>
                  <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-wider font-semibold">
                    Welcome, {userName}
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">Manage your account details</p>
                </div>
                <button 
                  onClick={() => navigate("/candidate/profile")}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  Profile
                </button>
              </div>

              <div className="flex-1 flex items-center justify-between p-5 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl backdrop-blur-sm">
                <div>
                  <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-wider font-semibold">
                    Ready to test?
                  </span>
                  <p className="text-xs text-slate-300 mt-0.5">View assessment guidelines</p>
                </div>
                <button 
                  onClick={() => navigate("/candidate/instructions")}
                  className="bg-[#10B981] hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all shadow-lg shadow-emerald-500/20 cursor-pointer whitespace-nowrap"
                >
                  Start Test
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto w-full px-6 py-24 border-t border-slate-900">
        <div className="flex flex-col gap-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Built for the last mile of hiring.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuresList.map((feature, index) => (
            <div 
              key={index}
              className="p-8 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl backdrop-blur-sm flex flex-col justify-between hover:border-emerald-500 hover:bg-emerald-950/40 transition-all group shadow-lg shadow-emerald-950/20"
            >
              <div>
                <h3 className="text-xl font-bold text-white mt-3 mb-2 tracking-tight group-hover:text-[#10B981] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer 
        id="contact"
        className="max-w-6xl mx-auto w-full px-6 py-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 uppercase tracking-wider"
      >
        <div>
          <span className="font-bold">
            <span className="text-white">Smart</span>
            <span className="text-[#10B981]">Recruit</span>
          </span>
        </div>

        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;