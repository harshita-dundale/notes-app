import React from "react";
import "./Navbar.css";
import { LuNotebookPen } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/store";

function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  //  console.log(isLoggedIn);
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };
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
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2 ">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About us
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/notes"
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

              {/* <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  <img
                    className="img-fluid user-png"
                    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    alt=""
                  />
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
