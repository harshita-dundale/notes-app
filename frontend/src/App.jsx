import React, { useEffect } from "react";
import Home from "./componants/home/Home.jsx";
import About from "./componants/about/About.jsx";
import Footer from "./componants/footer/Footer.jsx";
import Navbar from "./componants/navbar/Navbar.jsx";
import Signup from "./componants/signup/Signup.jsx";
import Signin from "./componants/signup/Signin.jsx";
import Notes from "./componants/notes/Notes.jsx";
import { useDispatch } from "react-redux";
import { authActions } from "./store/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    if (id && token) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <div>
            <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
