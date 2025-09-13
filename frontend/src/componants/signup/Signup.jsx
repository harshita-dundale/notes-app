import React, { useState } from "react";
import "./signup.css";
import { authApi } from "../../utils/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!input.email.trim() || !input.username.trim() || !input.password.trim()) {
      toast.error("All fields are required");
      return;
    }

    if (input.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.post("/register", input);
      
      toast.success("Account created successfully! Please sign in.");
      navigate("/signin");
      setInput({ email: "", username: "", password: "" });
    } catch (error) {
      console.error("Error during registration:", error);
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;
        
        if (status === 400) {
          toast.error(message || "Invalid input data");
        } else if (status === 409) {
          toast.error("User already exists. Please sign in instead.");
        } else if (status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error(message || "Registration failed");
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <ToastContainer />
      <div className="auth-container mt-5">
        <div className="auth-wrapper">
          <div className="auth-card">
            {/* Header */}
            <div className="auth-header">
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-subtitle">Join NotesApp and start organizing your thoughts</p>
            </div>

            {/* Form */}
            <form className="auth-form" onSubmit={submit}>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="auth-input"
                  onChange={change}
                  value={input.email}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  className="auth-input"
                  onChange={change}
                  value={input.username}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  className="auth-input"
                  onChange={change}
                  value={input.password}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="auth-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
              <div className="auth-footer">
              <p>Already have an account? <Link to="/signin" className="auth-link">Sign In</Link></p>
            </div>
            </form>

            {/* Footer */}
            
          </div>

          {/* Side Panel */}
          <div className="auth-side-panel">
            <div className="side-content">
              <h2>Welcome to NotesApp</h2>
              <p>Your digital companion for productivity and organization</p>
              <div className="feature-list">
                <div className="feature-item">
                  <span className="feature-icon">🔒</span>
                  <span>Secure & Private</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>Lightning Fast</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📱</span>
                  <span>Cross-Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;