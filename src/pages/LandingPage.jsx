import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-[#1D4ED8] selection:text-white">
      
      <header className="w-full border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 bg-[#1D4ED8] text-white rounded-xl flex items-center justify-center font-black text-xl shadow-md shadow-blue-600/20">
              S
            </div>
            <span className="text-xl font-bold tracking-tight lowercase">
              <span className="text-slate-900 font-extrabold">Smart</span><span className="text-[#1D4ED8]">Recruit</span><span className="text-[#1D4ED8]">.</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-mono text-slate-600">
            <a href="#about" className="hover:text-[#1D4ED8] transition-colors">About</a>
            <a href="#features" className="hover:text-[#1D4ED8] transition-colors">Features</a>
            <a href="#contact" className="hover:text-[#1D4ED8] transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/candidate/SignUpPage")}
              className="text-sm font-mono text-slate-600 hover:text-[#1D4ED8] px-3 py-2 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/candidate/login")}
              className="bg-[#1D4ED8] hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm shadow-blue-600/20"
            >
              Login
            </button>
          </div>

        </div>
      </header>

      <section className="max-w-6xl mx-auto w-full px-6 pt-20 pb-16 flex flex-col gap-12">
        
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter lowercase leading-none flex items-center flex-wrap">
            <span className="text-slate-900">Smart</span>
            <span className="text-[#1D4ED8]">Recruit</span>
            <span className="inline-block w-4 h-4 sm:w-6 sm:h-6 bg-[#1D4ED8] rounded-full ml-2 mb-10 sm:mb-16"></span>
            <span className="text-[#1D4ED8]">.</span>
          </h1>
          
          <p className="text-lg sm:text-2xl text-slate-600 max-w-3xl font-normal leading-relaxed mt-2">
            A poster-grade system for the last mile of hiring: turn <span className="text-slate-900 font-semibold underline decoration-[#1D4ED8] underline-offset-4">almost qualified</span> into confirmed, assessed, and locked, with a sign-off everyone trusts.
          </p>
        </div>

      </section>

      <footer id="contact" className="max-w-6xl mx-auto w-full px-6 py-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 uppercase tracking-wider">
        <div>
          <span className="font-bold">
            <span className="text-slate-900">Smart</span><span className="text-[#1D4ED8]">Recruit</span>
          </span> — completion & sign-off
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
          <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;