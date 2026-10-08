import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/Candidate/SignUpPage";
import CandidateLogin from "./pages/Candidate/CandidateLogin";
import CandidateProfileCompletion from "./pages/Candidate/CandidateProfileCompletion";
import CandidateInstructions from "./pages/Candidate/CandidateInstructions";
import CandidateSystemCheck from "./pages/Candidate/CandidateSystemCheck";
import RecruiterLogin from "./pages/Recruiter/RecruiterLogin";
import RecruiterSignUpPage from "./pages/Recruiter/RecruiterSignUpPage";
import RecruiterDashboard from "./pages/Recruiter/RecruiterDashboard";
import CreateAssessment from "./pages/Recruiter/CreateAssessment";
import CandidatesMonitoring from "./pages/Recruiter/CandidatesMonitoring";
import CandidateAssessmentReview from "./pages/Recruiter/CandidateAssessmentReview";
import CandidateAssessmentOverview from "./pages/Candidate/CandidateAssessmentOverview";
import CandidateActiveAssessment from "./pages/Candidate/CandidateActiveAssessment";
import AssessmentComplete from "./pages/Candidate/AssessmentComplete";
import CandidateVerifyOtp from "./pages/Candidate/CandidateVerifyOtp";
import CandidateResetPassword from "./pages/Candidate/CandidateResetPassword";
import RecruiterResetPassword from "./pages/Recruiter/RecruiterResetPassword";
import RecruiterVerifyOtp from "./pages/Recruiter/RecruiterVerifyOtp";

function isRecruiterLoggedIn() {
  if (!localStorage.getItem("token")) {
    return false;
  }

  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.role === "recruiter";
  } catch (error) {
    console.error("Unable to read recruiter session:", error);
    return false;
  }
}

function HomeRoute() {
  return isRecruiterLoggedIn()
    ? <Navigate to="/recruiter/dashboard" replace />
    : <LandingPage />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/candidate/SignUpPage" element={<SignUpPage />} />
        <Route path="/candidate/login" element={<CandidateLogin />} />
        <Route path="/candidate/reset-password" element={<CandidateResetPassword />} />
        <Route path="/candidate/verify-otp" element={<CandidateVerifyOtp />} />
        <Route path="/candidate/profile" element={<CandidateProfileCompletion />} />
        <Route path="/candidate/instructions" element={<CandidateInstructions />} />
        <Route path="/candidate/system-check" element={<CandidateSystemCheck />} />
        <Route path="/candidate/assessment-overview" element={<CandidateAssessmentOverview />} />
        <Route path="/candidate/assessment" element={<CandidateActiveAssessment />} />
        <Route path="/recruiter/login" element={<RecruiterLogin />} />
        <Route path="/recruiter/signup" element={<RecruiterSignUpPage />} />
        <Route path="/recruiter/reset-password" element={<RecruiterResetPassword />} />
        <Route path="/recruiter/verify-otp" element={<RecruiterVerifyOtp />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/assessment/create" element={<CreateAssessment />} />
        <Route path="/recruiter/candidates" element={<CandidatesMonitoring />} />
        <Route path="/recruiter/candidates/scorecard" element={<CandidateAssessmentReview />} />
        <Route path="/candidate/assessment-complete" element={<AssessmentComplete />} />
      </Routes>
    </Router>
  );
}

export default App;