import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CandidateLogin from "./pages/Candidate/CandidateLogin";
import RecruiterLogin from "./pages/Recruiter/RecruiterLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />
    
        <Route
          path="/candidate/login"
          element={<CandidateLogin />}
        />

        <Route
          path="/recruiter/login"
          element={<RecruiterLogin />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;