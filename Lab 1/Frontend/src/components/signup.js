import React, { useState, useEffect } from "react";
import "../styles/signup.css";
import Header from "./Header";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import cookie from "react-cookies";

import { useSelector, useDispatch } from "react-redux";

const SignUp = () => {
  const [user, setuser] = useState({
    username: null,
    email: null,
    password: null,
  });

  const username1 = useSelector((state) => state.username);
  const email1 = useSelector((state) => state.email);
  const password1 = useSelector((state) => state.password);
  const dispatch = useDispatch();
  useEffect(() => {
    if (username1 && email1 && password1) {
      console.log("Inside useeffect");
      
      Axios.post("http://localhost:3001/api/insert", {
        username: username1,
        email: email1,
        password: password1,
      })
      .then((response) => {
        console.log("response status is " + response.status);
        if (response.status === 200) {
          setuser({ ...user, redirect: "profile" });
          console.log("status is 200 redirect page");
          console.log("signup response api" + response.data);
          window.location.reload();
          cookie.save("auth", true, {
            path: "/",
            httpOnly: false,
            maxAge: 90000,
          });
          cookie.save("id", response.data.id, {
            path: "/",
            httpOnly: false,
            maxAge: 90000,
          });
          cookie.save("name", response.data.name, {
            path: "/",
            httpOnly: false,
            maxAge: 90000,
          });
          cookie.save("email", response.data.email, {
            path: "/",
            httpOnly: false,
            maxAge: 90000,
          });
          cookie.save("defaultcurrency", response.data.currency, {
            path: "/",
            httpOnly: false,
            maxAge: 90000,
          });
          cookie.save("timezone", "American/Los_Angeles", {
            path: "/",
            httpOnly: false,
            maxAge: 90000,
          });
        }
      })
      .catch(
         err=>{
         alert("Your email has already been registered !");
      })
    }
  }, [username1, email1, password1]);

  const submitreview = () => {
    console.log("Test");
    dispatch({
      type: "Signup",
      payload: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });

    //  console.log(user.username);
    //  console.log("email"+user.email);
    //  console.log("password"+user.password);
    //  Axios.post('http://localhost:3001/api/insert',{
    //    username:user.username, email:user.email, password: user.password
    // }).then(()=>{})
  };
  if (user.redirect === "profile") {
    console.log("inside profile redirect");
    dispatch({
      type: "Signup",
      payload: { username: user.username, email: user.email, password: null },
    });
    return <Redirect to="/Dashboard" />;
  }
  return (
    <div>
      <Header />
      <div className="container signup">
        <div className="signup-logo">
          <img src={require("../images/logo.png")} alt="" />
        </div>
        <form className="signup-form" onSubmit={submitreview}>
          <label htmlFor="">Please enter your name</label>
          <input
            id="username"
            pattern="[a-zA-Z0-9 ]{5,15}"
            title="Username should be between 5 to 15 characters"
            onChange={(e) => {
              setuser({ ...user, username: e.target.value });
            }}
            className="form-control"
            type="text"
            required
          />
          <label htmlFor="">Please enter your email address</label>
          <input
            id="email"
            onChange={(e) => {
              setuser({ ...user, email: e.target.value });
            }}
            className="form-control"
            type="email"
            required
          />
          <label htmlFor="">Please enter your password</label>
          <input
            id="password"
            onChange={(e) => {
              setuser({ ...user, password: e.target.value });
            }}
            className="form-control"
            type="password"
            required
          />
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
