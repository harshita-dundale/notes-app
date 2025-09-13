import React, { useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleClick = () => {
    navigate("/notes");
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero d-flex justify-content-center align-items-center text-center px-3">
        <div className="hero-text" data-aos="zoom-in">
          <h1>
            Organize Your <span className="highlight">Work & Life</span>
          </h1>
          <p className="lead mt-3">
            Boost productivity and keep track of everything with <strong>NotesApp</strong> — your personal digital notebook.
          </p>
          <button className="home-btn px-4 py-2 mt-3" onClick={handleClick}>
            ✍️ Start Taking Notes
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container-fluid py-5">
        <h2 className="text-center mb-4" data-aos="fade-up">Why Use NotesApp?</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="100">
            <div className="card feature-card p-4 shadow h-100 border-0">
              <h4>📋 Organized Interface</h4>
              <p>Manage everything with a clean and focused UI for minimal distraction.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="200">
            <div className="card feature-card p-4 shadow h-100 border-0">
              <h4>🌐 Sync Across Devices</h4>
              <p>Access your notes from mobile, tablet, or desktop seamlessly.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="300">
            <div className="card feature-card p-4 shadow h-100 border-0">
              <h4>🔒 End-to-End Security</h4>
              <p>Your data is encrypted and stored securely — privacy matters most.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4" data-aos="fade-up">How It Works</h2>
          <div className="row">
            <div className="col-md-3 col-6 mb-4" data-aos="fade-up" data-aos-delay="100">
              <h5>1. Create Account</h5>
              <p>Sign up in seconds — no setup needed.</p>
            </div>
            <div className="col-md-3 col-6 mb-4" data-aos="fade-up" data-aos-delay="200">
              <h5>2. Add Notes</h5>
              <p>Quickly jot down thoughts, ideas, and to-dos.</p>
            </div>
            <div className="col-md-3 col-6 mb-4" data-aos="fade-up" data-aos-delay="300">
              <h5>3. Edit & Update</h5>
              <p>Make changes anytime, anywhere.</p>
            </div>
            <div className="col-md-3 col-6 mb-4" data-aos="fade-up" data-aos-delay="400">
              <h5>4. Stay Organized</h5>
              <p>Visual clarity with real-time updates and sync.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section text-center py-5" data-aos="zoom-in">
        <h2>Ready to simplify your life?</h2>
        <p>Start using NotesApp today and experience the change.</p>
        <button className="home-btn px-5 py-3 mt-3" onClick={handleClick}>
          🚀 Get Started Now
        </button>
      </section>
    </div>
  );
}

export default Home;