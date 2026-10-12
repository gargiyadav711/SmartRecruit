import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../config";

function CandidateVerifyOtp({ role: propRole }) {
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = propRole || location.state?.role || "candidate";
  const passedEmail = location.state?.email || "";

  const [email, setEmail] = useState(passedEmail);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg("Email address is missing. Please enter your email.");
      return;
    }
    if (!otp || otp.trim().length !== 6) {
      setErrorMsg("Please enter a valid 6-digit verification code.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp: otp.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "OTP verification failed");
      }

      setSuccessMsg("Email verified successfully! Redirecting to login...");

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setTimeout(() => {
        navigate(userRole === "recruiter" ? "/recruiter/login" : "/candidate/login", {
          replace: true,
        });
      }, 1500);
    } catch (err) {
      console.error("Verification error:", err);
      setErrorMsg(err.message || "Something went wrong while verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    if (!email) {
      setErrorMsg("Please enter your email to resend OTP.");
      return;
    }

    setResending(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`${API_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Failed to resend OTP.");
      }

      setSuccessMsg("A new verification code has been sent to your email!");
      setCooldown(60);
    } catch (err) {
      console.error("Resend OTP error:", err);
      setErrorMsg(err.message || "Failed to resend code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="card">
        <div className="icon-wrapper">
          <svg
            className="shield-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>

        <h1 className="title">Verify Your Email</h1>
        <p className="subtitle">
          We sent a 6-digit verification code to
        </p>

        {passedEmail ? (
          <div className="email-badge">{email}</div>
        ) : (
          <div className="input-group email-input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="email-input"
              required
            />
          </div>
        )}

        {successMsg && <div className="alert alert-success">{successMsg}</div>}
        {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

        <form onSubmit={handleVerify} className="otp-form">
          <div className="input-group">
            <label className="label">6-Digit Verification Code</label>
            <input
              type="text"
              maxLength="6"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="••••••"
              className="otp-input"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="verify-btn"
          >
            {loading ? "Verifying..." : "Verify & Continue →"}
          </button>
        </form>

        <div className="resend-section">
          <span>Didn't receive the code?</span>
          {cooldown > 0 ? (
            <span className="cooldown-text">Resend in {cooldown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="resend-btn"
            >
              {resending ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </div>

        <div className="footer-link">
          <button
            type="button"
            className="back-btn"
            onClick={() =>
              navigate(userRole === "recruiter" ? "/recruiter/signup" : "/candidate/SignUpPage")
            }
          >
            ← Back to Sign Up
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  padding: 24px;
  font-family: "Google Sans Flex", "Google Sans", sans-serif;

  .card {
    background: #ffffff;
    max-width: 440px;
    width: 100%;
    border-radius: 16px;
    padding: 36px 32px;
    box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04);
    border: 1px solid #e2e8f0;
    text-align: center;
  }

  .icon-wrapper {
    width: 56px;
    height: 56px;
    margin: 0 auto 18px;
    background: #eff6ff;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #dbeafe;
  }

  .shield-icon {
    width: 28px;
    height: 28px;
    color: #2563eb;
  }

  .title {
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 6px;
  }

  .subtitle {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 10px;
  }

  .email-badge {
    display: inline-block;
    padding: 6px 14px;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    color: #1d4ed8;
    font-family: monospace;
    font-size: 13px;
    font-weight: 600;
    border-radius: 20px;
    margin-bottom: 20px;
    word-break: break-all;
  }

  .email-input-group {
    margin-bottom: 16px;
  }

  .email-input {
    width: 100%;
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;
    &:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    }
  }

  .alert {
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 16px;
    text-align: center;
  }

  .alert-success {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #166534;
  }

  .alert-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
  }

  .otp-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .input-group {
    text-align: left;
  }

  .label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #475569;
    margin-bottom: 8px;
    text-align: center;
  }

  .otp-input {
    width: 100%;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1.5px solid #cbd5e1;
    font-size: 24px;
    letter-spacing: 0.35em;
    text-align: center;
    font-family: monospace;
    font-weight: 700;
    color: #0f172a;
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box;

    &:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
    }
  }

  .verify-btn {
    width: 100%;
    padding: 12px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);

    &:hover:not(:disabled) {
      background: #1d4ed8;
      box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
    }

    &:disabled {
      opacity: 0.55;
      cursor: not-allowed;
      box-shadow: none;
    }
  }

  .resend-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 20px;
    font-size: 13px;
    color: #64748b;
  }

  .resend-btn {
    background: none;
    border: none;
    color: #2563eb;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    font-size: 13px;

    &:hover:not(:disabled) {
      text-decoration: underline;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .cooldown-text {
    font-weight: 600;
    color: #94a3b8;
  }

  .footer-link {
    margin-top: 22px;
    padding-top: 18px;
    border-top: 1px solid #f1f5f9;
  }

  .back-btn {
    background: none;
    border: none;
    color: #64748b;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      color: #0f172a;
    }
  }
`;

export default CandidateVerifyOtp;
