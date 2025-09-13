import React, { useEffect } from "react";
import "./Navbar.css";
import { LuNotebookPen } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/store";

function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  const logout = () => {
    sessionStorage.clear("id");
    localStorage.clear("id");
    localStorage.clear("token");
    dispatch(authActions.logout());
    closeNavbar();
  };

  const closeNavbar = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      bsCollapse.hide();
    }
  };

  // Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.querySelector('.navbar');
      const navbarCollapse = document.getElementById('navbarNav');
      
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        if (navbar && !navbar.contains(event.target)) {
          closeNavbar();
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container py-3">
        <Link className="navbar-brand fw-bold" to="/">
          <LuNotebookPen className="me-2" />
          Notes
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNavbar}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeNavbar}>
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/notes" onClick={closeNavbar}>
                Notes
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link btn-nav ms-2" to="/signup" onClick={closeNavbar}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn-nav ms-2" to="/signin" onClick={closeNavbar}>
                    Sign in
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link btn-nav ms-2" onClick={logout}>
                  Log Out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;