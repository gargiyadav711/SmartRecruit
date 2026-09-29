import { useState } from "react";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">LOGO</div>
                <h1>Welcome Back!</h1>
                <p>Login to continue to your account</p>
                <form>
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" required />
                    <label>Password</label>

                    <div className="password-box">
                        <input type={showPassword ? "text" : "password"} placeholder="Enter your password" required />

                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <div className="forgot">
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit">LOGIN</button>
                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                <p className="signup">
                    Don't have an account?{" "}
                    <a href="#">Sign Up</a>
                </p>

            </div>
        </div>
    );
}

export default Login;