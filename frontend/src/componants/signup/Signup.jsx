// Signup.jsx
import React, { useState } from "react";
import "./signup.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import {useNavigate} from "react-router-dom"

function Signup() {
  const histroy = useNavigate();
  const [input, setinput] = useState({ email: "", username: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/register", input);
       console.log("Login response:", res.data);
      if (res.data.message === "User already exists") {
        alert(res.data.message);
      } else {
        histroy("/signin")
        alert(res.data.message || "Sign up successful");
        setinput({ email: "", username: "", password: "" });
      }
    } catch (error) {
      // console.error("Error during registration:", error);
      // alert("Server error. Please try again later.");
      if (error.response?.status === 409) {
        alert("User already exists. Please sign in instead.");
      } else {
        console.error("Error during registration:", error);
        alert("Something went wrong. Please try again later.");
      }
    }
  };
  
  return (
    <div className="signup">
      <div className="container-fluid">
        <div className="row">
          {/* Left Form Section */}
          <div className="col-lg-8 d-flex justify-content-center align-items-center min-vh-100">
            <div className="d-flex flex-column w-100 w-lg-75 p-3">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="p-2 my-2 signup-input"
                onChange={change}
                value={input.email}
              />
              <input
                type="text"
                name="username"
                placeholder="Enter your Username"
                className="p-2 my-2 signup-input"
                onChange={change}
                value={input.username}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                className="p-2 my-2 signup-input"
                onChange={change}
                value={input.password}
              />
              <button className="btn-signup p-2 mt-3" onClick={submit}>
                Sign Up
              </button>
            </div>
          </div>

          {/* Right Heading Section */}
          <div className="col-lg-4 d-lg-flex justify-content-center align-items-center min-vh-100 col-left d-none">
            <HeadingComp first="Sign" second="Up" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
