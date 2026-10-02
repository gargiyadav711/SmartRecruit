import { useNavigate } from "react-router-dom";
import Button from "../components/Buttons";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full flex flex-col items-center">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            SmartRecruit
          </h1>
          <p className="mt-3 text-base md:text-lg text-slate-500 font-medium">
            AI-Powered Recruitment & Assessment Platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
            
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Candidate
            </h2>

            <p className="text-slate-500 text-sm mt-3 mb-8 leading-relaxed">
              Take assessments and showcase your skills seamlessly.
            </p>

            <div className="w-full mt-auto">
              <Button
                onClick={() => navigate("/candidate/login")}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm transition-colors"
              >
                Continue as Candidate
              </Button>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
            
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Recruiter
            </h2>

            <p className="text-slate-500 text-sm mt-3 mb-8 leading-relaxed">
              Create assessments and evaluate top candidates effectively.
            </p>

            <div className="w-full mt-auto">
              <Button
                onClick={() => navigate("/recruiter/login")}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm transition-colors"
              >
                Continue as Recruiter
              </Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
export default LandingPage;