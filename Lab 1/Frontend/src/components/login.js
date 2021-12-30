import React, { useState, useEffect } from "react";
import "../styles/signup.css";
import Header from "./Header";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import cookie from "react-cookies";

import { useSelector, useDispatch } from "react-redux";

export const Login = () => {
  const [user, setuser] = useState({
    email: null,
    password: null,
    redirect: null,
  });

  const email1 = useSelector((state) => state.email);
  const password1 = useSelector((state) => state.password);

  const dispatch = useDispatch();

  useEffect(() => {
    if (email1 && password1) {
      Axios.post("http://localhost:3001/api/get", {
        email: email1,
        password: password1,
      }).then((response) => {
        if (response.status === 200) {
          console.log(response.data);
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
          setuser({ ...user, redirect: "profile" });
        }
        else if (response.status===204){
          alert("Incorrect login !");
        }
      })
      .catch(
        err=>{
        alert("Database error !");
     })
    }
  }, [email1, password1]);

  const validate = (e) => {
    e.preventDefault();
    dispatch({
      type: "Login",
      payload: { email: user.email, password: user.password },
    });

    console.log(user.username);
    console.log("email" + user.email);
    console.log("password" + user.password);
    return <Redirect to="../containers/Dashboard" />;
    //  Axios.post('http://localhost:3001/api/get',{
    //    email:user.email, password: user.password
    // }).then((response)=>{
    //   console.log(response.data);
    // })
  };
  if (user.redirect === "profile") {
    return <Redirect to="/Dashboard" />;
  }
  return (
    <div>
      <Header />
      <div className="container signup">
        <div className="signup-logo">
          <img src={require("../images/logo.png")} alt="" />
        </div>
        <form className="signup-form" onSubmit={validate}>
          <h3>WELCOME TO SPLITWISE</h3>
          <label htmlFor="">Email address</label>
          <input
            id="email"
            className="form-control"
            type="email"
            required
            onChange={(e) => {
              setuser({ ...user, email: e.target.value });
            }}
          />
          <label htmlFor="">Password</label>
          <input
            id="password"
            className="form-control"
            type="password"
            required
            onChange={(e) => {
              setuser({ ...user, password: e.target.value });
            }}
          />
          {}
          <button type="submit" onSubmit={validate} className="btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
