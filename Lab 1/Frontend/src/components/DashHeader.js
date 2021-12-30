import React from 'react'
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import cookie from "react-cookies";

import '../styles/dashHeader.css'
const DashHeader = ()=>{
  // handlelogout = e => {
  //   e.preventDefault();
  //   console.log(this.state);
  //                   axios
  //           .post("http://localhost:3001/logout", this.state).then(response => {
  //               if(response.status === 200){
  //                   window.location.assign("/landing");
  //               }
  //           })
 
  // const logout=()=> {
  //   axios
  //   .post("http://localhost:3001/logout").then(response => {
  //     window.location.assign("/landing");
  //   })
  // }

  const logout =(e)=>{
    cookie.remove('auth');
    cookie.remove('id');
    cookie.remove('name');
    cookie.remove('email');
    cookie.remove('defaultcurrency');
    cookie.remove('timezone');

      window.location.assign("/");
  return false;
  }
   return (
     <div>
       <div></div>
     <nav className = "DashboardNav fixed-top">
       <NavLink to = "/Dashboard"><h3 className = "landing-name">S P L I T W I S E</h3></NavLink>
       <div className = "Dashfloat">
       <NavLink to = "/Recentactivity" className = "btn">Recent Activity</NavLink>
       <NavLink to = "/Creategroup" className = "btn">Create Group</NavLink>         
       <NavLink to = "/Mygroup" className = "btn">My Group</NavLink>         
       <NavLink to = "/Profile">
         <img className = "profile" src={require('../images/default-pic.png')} alt=""/></NavLink>
         <label htmlFor="">{}</label>
         <NavLink to = "/"><button className = "logoutbtn" onClick={logout}>Log Out</button>
          </NavLink>
          {console.log("inside DashHeader")}
        </div>
      </nav>
      </div>
    )
}

const mapStateToProps = state => {
  console.log("state is  ", state);
  return {
    user: state.user
  };
};

const fn = connect(mapStateToProps);
export default fn(DashHeader);

