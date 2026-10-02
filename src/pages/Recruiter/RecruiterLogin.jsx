import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RecruiterLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    console.log("Recruiter Email:", email);
    console.log("Recruiter Password:", password);
    navigate("/recruiter/dashboard");
  }

  return (
    <div className="min-h-screen flex w-full overflow-hidden bg-white">
      <div className="hidden md:block w-[58%] relative min-h-screen">
        <img
          src="/recruiter.jpg"
          alt="Recruitment background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
        
        <h1 className="absolute top-8 left-12 text-4xl font-extrabold text-slate-900 tracking-tight drop-shadow-sm">
          SmartRecruit
        </h1>
      </div>

      <div className="w-full md:w-[42%] min-h-screen flex items-center justify-center px-6 sm:px-12 py-12 overflow-y-auto">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Welcome to SmartRecruit
          </h1>

          <p className="mt-2 text-slate-500 text-sm">
            Login to continue to your assessment platform.
          </p>

          <div className="flex p-1 bg-slate-100 border border-slate-200 rounded-xl mt-6">
            <button
              type="button"
              className="w-1/2 py-2.5 text-slate-600 font-medium hover:text-slate-900 transition-all"
              onClick={() => navigate("/candidate/login")}
            >
              I'm a Candidate
            </button>

            <button
              type="button"
              className="w-1/2 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm transition-all"
              onClick={() => navigate("/recruiter/login")}
            >
              I'm a Recruiter
            </button>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">

              <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 bg-slate-100 border border-slate-200 rounded-xl px-4 text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                required
              />
            </div>

              <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 bg-slate-100 border border-slate-200 rounded-xl px-4 pr-12 text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 text-sm"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>
            <div className="text-right">
              <button
                type="button"
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white rounded-xl font-medium shadow-md shadow-blue-500/20 transition-all"
            >
              Login →
            </button>

          </form>

          <div className="text-center mt-6 text-sm">
            <span className="text-slate-500">
              Don't have an account?
            </span>
            <button type="button" className="ml-1.5 text-blue-600 font-semibold hover:underline">
              Create Account
            </button>
          </div>

          <p className="text-center text-[11px] text-slate-400 mt-12">
            Protected by SmartRecruit Shield • Privacy & Terms
          </p>

        </div>
      </div>

    </div>
  );
}

export default RecruiterLogin;