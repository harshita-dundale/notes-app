import React, { useState } from 'react';
import './signup.css';
import { authApi } from "../../utils/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/store";
import { ToastContainer, toast } from 'react-toastify';

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.username.trim() || !input.password.trim()) {
      toast.error("Username and password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.post("/signin", input);

      if (res.data.token) {
        toast.success("Welcome back! 🎉");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user.id);
        dispatch(authActions.login());
        setTimeout(() => {
          navigate("/notes");
        }, 1000);
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;
        
        if (status === 400) {
          toast.error(message || "Invalid input data");
        } else if (status === 401) {
          toast.error("Invalid username or password");
        } else if (status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error(message || "Login failed");
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Something went wrong. Please try again.");
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
          {/* Side Panel */}
          <div className="auth-side-panel">
            <div className="side-content">
              <h2>Welcome Back!</h2>
              <p>Sign in to access your notes and continue your productivity journey</p>
              <div className="feature-list">
                <div className="feature-item">
                  <span className="feature-icon">📝</span>
                  <span>Access Your Notes</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔄</span>
                  <span>Sync Across Devices</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎯</span>
                  <span>Stay Organized</span>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-card">
            {/* Header */}
            <div className="auth-header">
              <h1 className="auth-title">Sign In</h1>
              <p className="auth-subtitle">Welcome back to NotesApp</p>
            </div>

            {/* Form */}
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="auth-input"
                  value={input.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="auth-input"
                  value={input.password}
                  onChange={handleChange}
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
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="auth-footer">
              <p>Don't have an account? <Link to="/signup" className="auth-link">Create Account</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;