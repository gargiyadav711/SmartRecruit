import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/Candidate/SignUpPage";
import CandidateLogin from "./pages/Candidate/CandidateLogin";
import CandidateProfileCompletion from "./pages/Candidate/CandidateProfileCompletion";
import CandidateInstructions from "./pages/Candidate/CandidateInstructions";
import CandidateSystemCheck from "./pages/Candidate/CandidateSystemCheck";
import RecruiterLogin from "./pages/Recruiter/RecruiterLogin";
import CandidateAssessmentOverview from "./pages/Candidate/CandidateAssessmentOverview";
import CandidateActiveAssessment from "./pages/Candidate/CandidateActiveAssessment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/candidate/SignUpPage" element={<SignUpPage />} />
        <Route path="/candidate/login" element={<CandidateLogin />} />
        <Route path="/candidate/profile" element={<CandidateProfileCompletion />} />
        <Route path="/candidate/instructions" element={<CandidateInstructions />} />
        <Route path="/candidate/system-check" element={<CandidateSystemCheck />} />
        <Route path="/candidate/assessment-overview" element={<CandidateAssessmentOverview />} />
        <Route path="/candidate/assessment" element={<CandidateActiveAssessment />} />
        <Route path="/recruiter/login" element={<RecruiterLogin />} />
      </Routes>
    </Router>
  );
}

export default App;