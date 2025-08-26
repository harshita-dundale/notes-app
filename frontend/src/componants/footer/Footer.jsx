import React from 'react'
import "./footer.css"

function Footer() {
  return (
    <footer className="modern-footer">
      <div className="container">
        <div className="row">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="footer-brand">NotesApp</h5>
            <p className="footer-description">
              Your digital companion for productivity and organization. Simple, secure, and always accessible.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📧</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">💼</a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="footer-title">Quick Links</h6>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/notes">Notes</a></li>
              <li><a href="/signin">Sign In</a></li>
            </ul>
          </div>
          
          {/* Features */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="footer-title">Features</h6>
            <ul className="footer-links">
              <li><a href="#">Secure Notes</a></li>
              <li><a href="#">Cross-Platform</a></li>
              <li><a href="#">Real-time Sync</a></li>
              <li><a href="#">24/7 Support</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="footer-title">Contact</h6>
            <div className="contact-info">
              <p>📧 support@notesapp.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 San Francisco, CA</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copyright">© 2025 NotesApp. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="made-with">Made with ❤️ by <strong>TheCodeMaster</strong></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer