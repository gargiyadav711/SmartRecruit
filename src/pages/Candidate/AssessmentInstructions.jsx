import React, { useState } from "react";

function AssessmentInstructions() {
  const [agreed, setAgreed] = useState(false);

  const requirements = [
    "Make sure your camera and microphone are working properly.",
    "Complete the assessment within the allotted time without taking breaks.",
    "Read each question carefully before responding or executing code.",
    "Remain on the assessment screen during the session; leaving full-screen may flag proctoring alerts.",
  ];

  const assessmentTypes = [
    {
      icon: "fa-solid fa-code",
      title: "Technical Questions",
      description:
        "Answer role-specific technical questions covering DOM performance, asynchronous patterns, and state architecture.",
      bottom: "Multiple Choice",
    },
    {
      icon: "fa-solid fa-microphone",
      title: "Spoken Response",
      description:
        "Respond to selected scenario questions using your microphone to explain architectural trade-offs.",
      bottom: "2 Audio Records",
    },
    {
      icon: "fa-solid fa-laptop-code",
      title: "Coding Challenge",
      description:
        "Write, compile, and execute your code directly in the embedded Monaco editor against predefined unit tests.",
      bottom: "1 Live Challenge",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#172033]">

      {/* ================= HEADER ================= */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1180px] mx-auto px-5 py-4">

          <div className="flex items-center justify-between">

            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-sm bg-[#1769c2]"></div>

                <span className="text-xl font-bold">
                  SmartRecruit
                </span>
              </div>

              <div className="hidden sm:block h-6 w-px bg-gray-300"></div>

              <span className="hidden sm:block text-sm font-semibold text-gray-500 tracking-wide">
                EVALUATION PORTAL
              </span>
            </div>

            {/* Candidate */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-sm">
                  Priya Tiwari
                </p>
                <p className="text-sm text-gray-500">
                  candidate
                </p>
              </div>

              <div className="w-9 h-9 rounded-full bg-[#1769c2] text-white flex items-center justify-center">
                <i className="fa-solid fa-user"></i>
              </div>
            </div>

          </div>

          {/* ================= STEPPER ================= */}
          <div className="mt-4 hidden md:flex items-center justify-center gap-3">

            <Step number="1" text="Instructions" active />

            <div className="w-10 lg:w-16 h-px bg-gray-300"></div>

            <Step number="2" text="Permission check" />

            <div className="w-10 lg:w-16 h-px bg-gray-300"></div>

            <Step number="3" text="Assessment overview" />

            <div className="w-10 lg:w-16 h-px bg-gray-300"></div>

            <Step number="4" text="Assessment" />

          </div>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="px-4 py-6">

        <div className="max-w-[865px] mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">

          {/* Assessment label */}
          <div className="inline-flex items-center gap-2 bg-[#eef5ff] text-[#1769c2] px-3 py-1 rounded-md text-xs font-bold tracking-wide">
            <span>●</span>
            ASSESSMENT
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-semibold mt-3">
            Frontend Developer Assessment
          </h1>

          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Review the instructions before starting your assessment.
            Ensure your setup is ready and uninterrupted.
          </p>

          {/* ================= INFO CARDS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

            <InfoCard
              icon="fa-regular fa-clock"
              title="DURATION"
              value="30 min"
            />

            <InfoCard
              icon="fa-regular fa-square-question"
              title="QUESTIONS"
              value="6 Questions"
            />

            <InfoCard
              icon="fa-solid fa-terminal"
              title="ASSESSMENT TYPE"
              value="Technical Screening"
            />

          </div>

          {/* ================= REQUIREMENTS ================= */}
          <div className="mt-8">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Before you begin
              </h2>

              <span className="text-xs font-semibold text-gray-500">
                Mandatory Requirements
              </span>
            </div>

            <div className="bg-[#f8fafc] rounded-xl px-4">

              {requirements.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 py-4 ${
                    index !== requirements.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <div className="w-5 h-5 shrink-0 rounded-full bg-[#dceaff] text-[#1769c2] flex items-center justify-center mt-0.5">
                    <i className="fa-solid fa-check text-[10px]"></i>
                  </div>

                  <p className="text-sm font-medium text-gray-700">
                    {item}
                  </p>
                </div>
              ))}

            </div>
          </div>

          {/* ================= WHAT TO EXPECT ================= */}
          <div className="mt-8">

            <h2 className="text-lg font-semibold mb-5">
              What to expect
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {assessmentTypes.map((item, index) => (
                <AssessmentCard
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  bottom={item.bottom}
                />
              ))}

            </div>

          </div>

          {/* ================= AGREEMENT ================= */}
          <label className="flex items-start gap-3 mt-7 p-4 rounded-xl bg-[#f8fafc] cursor-pointer">

            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 mt-1 accent-[#1769c2]"
            />

            <span className="text-sm text-gray-600 leading-6">
              I confirm that I am in a quiet space, my hardware meets
              the test requirements, and I agree to complete this
              assessment without unauthorized aids or third-party
              collaboration.
            </span>

          </label>

          {/* ================= BOTTOM ================= */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-6">

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <i className="fa-solid fa-shield-halved text-[#1769c2]"></i>

              <span>
                Your responses may be processed for assessment and evaluation.
              </span>
            </div>

            <button
              disabled={!agreed}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
                agreed
                  ? "bg-[#6598d8] hover:bg-[#4f87cd] text-white"
                  : "bg-[#a9c5e7] text-white cursor-not-allowed"
              }`}
            >
              Continue to System Check
              <i className="fa-solid fa-arrow-right"></i>
            </button>

          </div>

        </div>

        {/* Exit */}
        <div className="text-center mt-5">
          <button className="font-semibold text-sm text-gray-700 hover:text-[#1769c2]">
            Exit Assessment
          </button>
        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-gray-200 mt-2">

        <div className="max-w-[1180px] mx-auto px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">

          <div className="flex items-center gap-2">
            <i className="fa-solid fa-lock text-[#1769c2]"></i>

            <span>
              Powered by SmartRecruit Candidate Portal • Secure & Confidential
            </span>
          </div>

          <div className="flex gap-5">
            <span className="cursor-pointer hover:text-gray-800">
              Privacy Policy
            </span>

            <span className="cursor-pointer hover:text-gray-800">
              Candidate Terms
            </span>
          </div>

        </div>

      </footer>

    </div>
  );
}


/* =====================================================
   STEPPER COMPONENT
===================================================== */

function Step({ number, text, active = false }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
        active
          ? "bg-[#1769c2] text-white"
          : "text-gray-500"
      }`}
    >
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
          active
            ? "bg-white text-[#1769c2]"
            : "bg-[#e5edf8] text-gray-500"
        }`}
      >
        {number}
      </span>

      {text}
    </div>
  );
}


/* =====================================================
   INFO CARD
===================================================== */

function InfoCard({ icon, title, value }) {
  return (
    <div className="bg-[#f3f8fe] rounded-xl p-4 flex items-center gap-4">

      <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center text-[#1769c2] text-lg shadow-sm">
        <i className={icon}></i>
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-bold text-gray-500 tracking-wide">
          {title}
        </p>

        <p className="font-semibold text-[16px] truncate">
          {value}
        </p>
      </div>

    </div>
  );
}


/* =====================================================
   ASSESSMENT CARD
===================================================== */

function AssessmentCard({
  icon,
  title,
  description,
  bottom,
}) {
  return (
    <div className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">

      <div className="w-9 h-9 rounded-lg bg-[#eef5ff] text-[#1769c2] flex items-center justify-center mb-3">
        <i className={icon}></i>
      </div>

      <h3 className="font-semibold text-[15px]">
        {title}
      </h3>

      <p className="text-sm text-gray-500 leading-5 mt-2">
        {description}
      </p>

      <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-gray-500">
        <i className="fa-solid fa-list"></i>
        {bottom}
      </div>

    </div>
  );
}

export default AssessmentInstructions;