import React, { useState } from "react";
import "./CssFile/Login.css";
import toast, { Toaster } from "react-hot-toast";

function Login({ setshowPage, supabase }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("");

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast.error("Try again");
        console.error(error.message);
      } else {
        toast.success("Signup successful! Check your email.");
        localStorage.setItem("library-management-email", email);
        localStorage.setItem("library-management-pass", password);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error("Invalid User");
        console.error(error.message);
      } else {
        toast.success("Login successful.");
        localStorage.setItem("library-management-email", email);
        localStorage.setItem("library-management-pass", password);
        setshowPage("Content");
      }
    }
  };

  return (
    <div className="auth-container">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="auth-card">
        <h2 className="auth-title">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleAuth} className="auth-form">
          <div>
            <label className="auth-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
          </div>

          <div>
            <label className="auth-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="auth-toggle">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="auth-toggle-button"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </div>

        {message && (
          <p
            className={`auth-message ${
              message.includes("successful") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}

        <div className="demo-info">
          <p className="demo-text">Use your own account or try the demo:</p>
          <div className="demo-credentials">
            <p><strong>Email:</strong> demo@example.com</p>
            <p><strong>Password:</strong> demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
