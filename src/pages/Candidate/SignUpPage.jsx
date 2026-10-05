import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle normal signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check empty fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage("Please fill all the fields.");
      return;
    }

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Send data to backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            confirmPassword: formData.confirmPassword
          }),
        }
      );

      const data = await response.json();

      // Backend returned an error
      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      // Registration successful
      setMessage("Account created successfully!");

      console.log("Backend response:", data);

      // Navigate to login
      setTimeout(() => {
        navigate("/candidate/login");
      }, 1500);

    } catch (error) {
      console.error("Signup error:", error);

      setMessage(
        error.message ||
          "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // Google signup
  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked");

    // Google OAuth backend integration
    // will be added here
  };

  return (
    <StyledWrapper>

      <div className="container">

        {/* Heading */}
        <div className="heading">
          Create Account
        </div>

        <p className="subtitle">
          Sign up to get started
        </p>

        {/* Signup Form */}
        <form
          className="form"
          onSubmit={handleSubmit}
        >

          {/* Full Name */}
          <input
            required
            className="input"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          {/* Email */}
          <input
            required
            className="input"
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          {/* Password */}
          <input
            required
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          {/* Confirm Password */}
          <input
            required
            className="input"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              })
            }
          />

          {/* Signup Button */}
          <button
            className="signup-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Sign Up"}
          </button>

        </form>

        {/* Success / Error Message */}
        {message && (
          <p className="message">
            {message}
          </p>
        )}

        {/* Social Signup */}
        <div className="social-account-container">

          <span className="title">
            Or Sign up with
          </span>

          <div className="social-accounts">

            {/* Google */}
            <button
              type="button"
              className="social-button google"
              onClick={handleGoogleSignUp}
            >
              <svg
                className="svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />

                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.36 7.22 24 12 24z"
                />

                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.12 0 9.87 0 11.7s.43 3.58 1.19 5.12l4.09-2.55z"
                />

                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.17 2.64 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </button>

          </div>
        </div>

        {/* Login */}
        <p className="login-text">
          Already have an account?{" "}

          <span
            onClick={() =>
              navigate("/candidate/login")
            }
          >
            Login
          </span>
        </p>

      </div>

    </StyledWrapper>
  );
}


// ===============================
// STYLED COMPONENT
// ===============================

const StyledWrapper = styled.div`

  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 20px;

  background: #f4f7fb;


  .container {

    width: 100%;

    max-width: 390px;

    background:
      linear-gradient(
        0deg,
        rgb(255, 255, 255) 0%,
        rgb(244, 247, 251) 100%
      );

    border-radius: 40px;

    padding: 30px 35px;

    border: 5px solid white;

    box-shadow:
      rgba(133, 189, 215, 0.55)
      0px 30px 30px -20px;

  }


  .heading {

    text-align: center;

    font-weight: 900;

    font-size: 30px;

    color: rgb(16, 137, 211);

  }


  .subtitle {

    text-align: center;

    font-size: 13px;

    color: rgb(130, 130, 130);

    margin-top: 5px;

  }


  .form {

    margin-top: 20px;

  }


  .form .input {

    width: 100%;

    box-sizing: border-box;

    background: white;

    border: none;

    padding: 15px 20px;

    border-radius: 20px;

    margin-top: 15px;

    box-shadow:
      #cff0ff
      0px 10px 10px -5px;

    border-inline:
      2px solid transparent;

    font-size: 14px;

  }


  .form .input::placeholder {

    color: rgb(170, 170, 170);

  }


  .form .input:focus {

    outline: none;

    border-inline:
      2px solid #12B1D1;

  }


  .signup-button {

    display: block;

    width: 100%;

    font-weight: bold;

    background:
      linear-gradient(
        45deg,
        rgb(16, 137, 211) 0%,
        rgb(18, 177, 209) 100%
      );

    color: white;

    padding: 15px;

    margin: 25px auto 20px;

    border-radius: 20px;

    box-shadow:
      rgba(133, 189, 215, 0.55)
      0px 20px 10px -15px;

    border: none;

    transition: all 0.2s ease-in-out;

    cursor: pointer;

  }


  .signup-button:hover {

    transform: scale(1.03);

    box-shadow:
      rgba(133, 189, 215, 0.55)
      0px 23px 10px -20px;

  }


  .signup-button:active {

    transform: scale(0.95);

  }


  .signup-button:disabled {

    opacity: 0.7;

    cursor: not-allowed;

    transform: none;

  }


  .message {

    text-align: center;

    font-size: 13px;

    margin-top: 10px;

    color: #555;

  }


  .social-account-container {

    margin-top: 25px;

  }


  .social-account-container .title {

    display: block;

    text-align: center;

    font-size: 11px;

    color: rgb(170, 170, 170);

  }


  .social-accounts {

    width: 100%;

    display: flex;

    justify-content: center;

    gap: 15px;

    margin-top: 10px;

  }


  .social-button {

    background:
      linear-gradient(
        45deg,
        rgb(0, 0, 0) 0%,
        rgb(112, 112, 112) 100%
      );

    border: 5px solid white;

    padding: 7px;

    border-radius: 50%;

    width: 48px;

    height: 48px;

    display: grid;

    place-content: center;

    box-shadow:
      rgba(133, 189, 215, 0.55)
      0px 12px 10px -8px;

    transition: all 0.2s ease-in-out;

    cursor: pointer;

  }


  .social-button:hover {

    transform: scale(1.2);

  }


  .social-button:active {

    transform: scale(0.9);

  }


  .social-button .svg {

    width: 22px;

    height: 22px;

  }


  .login-text {

    text-align: center;

    font-size: 13px;

    color: rgb(120, 120, 120);

    margin-top: 25px;

  }


  .login-text span {

    color: #0099ff;

    font-weight: 600;

    cursor: pointer;

  }


  .login-text span:hover {

    text-decoration: underline;

  }

`;

export default SignUp;