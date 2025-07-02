import React from 'react'
import './signup.css';
import HeadingComp from './HeadingComp';
import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {authActions } from "../../store/store";

function Signin() {
  const histroy = useNavigate();
const dispatch = useDispatch();

  const [input, setinput] = useState({ email: "", password: "" });
  const change = (e) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/signin", input);

      // .then((res) => {
      //   sessionStorage.setItem("id", res.data._id)
      // });
      // histroy("/notes")
      console.log("Login response:", res.data);

      if (res.data._id) {
        sessionStorage.setItem("id", res.data._id);
        dispatch(authActions.login());
        histroy("/notes");
      } else {
        alert(res.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      const msg = error.response?.data?.message;
    if (msg) {
      alert(msg); // ⚠️ Show message from backend: email not found / wrong password
    } else {
      alert("Something went wrong. Try again.");
    }
    console.error("Login error:", error);
    }
  };
  return (
    <div><div className='signup'>
    <div className="container-fluid">
      <div className="row">
         {/* Right Heading Section */}
         <div className="col-lg-4 d-lg-flex justify-content-center align-items-center min-vh-100 col-left d-none">
          <HeadingComp first="Sign" second="In" />
        </div>
        
        {/* Left Form Section w-100 w-lg-75*/}
        <div className="col-lg-8 d-flex justify-content-center align-items-center min-vh-100">
          <div className="d-flex flex-column  w-100 w-lg-75 p-3">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="p-2 my-2 signup-input"
              value={input.email}
              onChange={change}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              className="p-2 my-2 signup-input"
              value={input.password}
              onChange={change}
            />
            <button className="btn-signup p-2 mt-3" onClick={submit}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default Signin