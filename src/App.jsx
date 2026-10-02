import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CandidateLogin from "./pages/Candidate/CandidateLogin";
import CandidateInstructions from "./pages/Candidate/CandidateInstructions";
import CandidateSystemCheck from "./pages/Candidate/CandidateSystemCheck";
import RecruiterLogin from "./pages/Recruiter/RecruiterLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/candidate/login" element={<CandidateLogin />} />
        <Route path="/candidate/instructions" element={<CandidateInstructions />} />
        <Route path="/candidate/system-check" element={<CandidateSystemCheck />} />

        <Route path="/recruiter/login" element={<RecruiterLogin />} />
      </Routes>
    </Router>
  );
}

export default App;