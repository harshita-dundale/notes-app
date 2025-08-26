import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { LuNotebookPen } from "react-icons/lu";
import { HiX, HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/store";

function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.querySelector('.navbar');
      if (isMenuOpen && navbar && !navbar.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="#">
            <b>
              <LuNotebookPen /> Notes
            </b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
          <div className={` navbar-collapse ${isMenuOpen ? 'show' : ''}`} >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2 ">
                <Link className="nav-link active" aria-current="page" to="/" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                  onClick={closeMenu}
                >
                  About us
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/notes"
                  onClick={closeMenu}
                >
                  Notes
                </Link>
              </li>

              {!isLoggedIn && (
                <>
                  <div className="d-flex">
                    <li className="nav-item mx-2">
                      <Link
                        className="nav-link active btn-nav p-2"
                        aria-current="page"
                        to="/signup"
                        onClick={closeMenu}
                      >
                        Sign up
                      </Link>
                    </li>
                  </div>
                  <div className="d-flex my-lg-0 my-2">
                    <li className="nav-item mx-2">
                      <Link
                        className="nav-link active btn-nav p-2"
                        aria-current="page"
                        to="/signin"
                        onClick={closeMenu}
                      >
                        Sign in
                      </Link>
                    </li>
                  </div>
                </>
              )}

              {isLoggedIn && (
                <>
                  <div className="d-flex">
                    <li className="nav-item mx-2" onClick={logout}>
                      <Link
                        className="nav-link active btn-nav p-2"
                        aria-current="page"
                        to="#"
                      >
                        Log Out
                      </Link>
                    </li>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;