import React from 'react';
import {Switch,Route} from 'react-router-dom';
// import { Login } from './components/login';
import Login_smart from './containers/login_container';
import { Landing } from './components/landing';
import  SignUp  from './components/signup';
import {Dashboard} from './containers/Dashboard';
import {Profile} from './containers/Profile';
import {Mygroup} from './containers/Mygroup';
import {NewGroup} from './containers/Creategroup';
import {EditGroup} from './containers/editgroup';
import {GroupPage} from './containers/grouppage';


// import {NewGroup} from './containers/newgroup';
import {RecentActivity} from './containers/Recentactivity';
export  class App extends React.Component{
  render(){
    return (
      <div>
        <Switch>
          <Route exact path = "/" component = {Landing}></Route>
          <Route exact path = "/login" component = {Login_smart}></Route>
          <Route exact path = "/signup" component = {SignUp}></Route>
          <Route exact path = "/Dashboard" component = {Dashboard}></Route>
          <Route exact path = "/Profile" component = {Profile}></Route>
          <Route exact path = "/RecentActivity" component = {RecentActivity}></Route>
          <Route exact path = "/Mygroup" component = {Mygroup}></Route>
          <Route exact path = "/Creategroup" component = {NewGroup}></Route>
          <Route exact path = "/EditGroup" component = {EditGroup}></Route>
          <Route exact path = "/GroupPage" component = {GroupPage}></Route>
       </Switch>
      </div>
    )
  }
} 