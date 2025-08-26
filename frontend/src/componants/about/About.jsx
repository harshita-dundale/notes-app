import React, { useEffect } from 'react';
import "./about.css";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className='about white-bg'>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="about-title" data-aos="fade-up">About NotesApp</h1>
              <p className="about-subtitle" data-aos="fade-up" data-aos-delay="200">
                Your digital companion for productivity and organization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h2 className="section-title">Our Mission</h2>
              <p className="section-text">
                We believe that great ideas shouldn't be lost in the chaos of daily life. NotesApp was created to provide a simple, elegant, and powerful platform where your thoughts can flourish and your productivity can soar.
              </p>
              <p className="section-text">
                Whether you're a student, professional, or creative thinker, our app adapts to your workflow and helps you stay organized without getting in your way.
              </p>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="mission-card">
                <div className="mission-icon">🎯</div>
                <h4>Simplicity First</h4>
                <p>Clean, intuitive design that focuses on what matters most - your content.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="section-title" data-aos="fade-up">Why Choose NotesApp?</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h4>Secure & Private</h4>
                <p>Your notes are encrypted and stored securely. Privacy is our top priority.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h4>Lightning Fast</h4>
                <p>Optimized performance ensures your notes are always accessible instantly.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h4>Cross-Platform</h4>
                <p>Access your notes from any device, anywhere, anytime with seamless sync.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3 col-6 mb-4" data-aos="fade-up" data-aos-delay="100">
              <div className="stat-card">
                <h3>10K+</h3>
                <p>Active Users</p>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="stat-card">
                <h3>1M+</h3>
                <p>Notes Created</p>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4" data-aos="fade-up" data-aos-delay="300">
              <div className="stat-card">
                <h3>99.9%</h3>
                <p>Uptime</p>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4" data-aos="fade-up" data-aos-delay="400">
              <div className="stat-card">
                <h3>24/7</h3>
                <p>Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8" data-aos="zoom-in">
              <h2>Ready to Get Organized?</h2>
              <p>Join thousands of users who have transformed their productivity with NotesApp.</p>
              <a href="/notes" className="cta-btn">Start Taking Notes</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;