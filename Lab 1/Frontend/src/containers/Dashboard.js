import React from 'react';
import DashHeader from '../components/DashHeader';
import { Redirect } from 'react-router'
import TotalGiving from './total-giving';
import TotalOwe from './total-owe';
import "../styles/Dashboard.css";
import cookie from "react-cookies";
import axios from 'axios';

export class Dashboard extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                totalBalance: "",
                totalNegativeBalance: [],
                totalPositiveBalance: [],
                totalBalance: [],
                totalOwingData: [],
                totalOwingFlag: false,
                totalGivingData: [],
                totalGivingFlag: false
            }
    }
    async componentDidMount(){
        var userID = cookie.load("id");
        const negResponse = await axios.get("http://localhost:3001/expense/negtotalbalance/" + userID);
        console.log(negResponse.data)
        if (negResponse.data === []) {
            this.setState({
                totalNegativeBalance: "$0"
            })
        }
        else {
            this.setState({
                totalNegativeBalance: negResponse.data
            })
        }

        const posResponse = await axios.get("http://localhost:3001/expense/postotalbalance/" + userID);
        if (posResponse.data === []) {
            this.setState({
                totalPositiveBalance: "$0"
            })
        }
        else {
            this.setState({
                totalPositiveBalance: posResponse.data
            })
        }

        const totalResponse = await axios.get("http://localhost:3001/expense/totalbalance/" + userID);
        if (totalResponse.data === []) {
            this.setState({
                totalBalance: "$0"
            })
        }
        else {
            this.setState({
                totalBalance: totalResponse.data
            })
        }
        const totalOwingResponse = await axios.get("http://localhost:3001/expense/totalowing/" + userID);
        console.log(totalOwingResponse.data)
        if (totalOwingResponse.data.length === 0) {
            this.setState({
                totalOwingFlag: true
            })
        }
        else {
            this.setState({
                totalOwingData: totalOwingResponse.data,
                totalOwingFlag: false
            })
        }
        const totalGivingResponse = await axios.get("http://localhost:3001/expense/totalgiving/" + userID);
        console.log(totalGivingResponse.data)
        if (totalGivingResponse.data.length === 0) {
            this.setState({
                totalGivingFlag: true
            })
        }
        else {
            this.setState({
                totalGivingData: totalGivingResponse.data,
                totalGivingFlag: false

            })
        }
    }
render(){
    let redirectTo = null;
        if (!(cookie.load("auth"))) {
            redirectTo = <Redirect to="/" />
        }
        let totalOwe = null;
        let totalGiving = null;
        console.log(this.state)
        if (this.state.totalOwingFlag) {
            totalOwe = (
                <div style={{ margin: "130px" }}>
                    {/* <img src={emptyplaceholder} width="300px" height="200px" alt="" /> */}
                    <h6 style={{ font: "Bookman" }}>You are owed nothing</h6>
                </div>
            )

        }
        else {
            totalOwe = this.state.totalOwingData.map((data) => {
                return (
                    <div>
                        <TotalOwe key={data.ref_groupid} totalOweData={data} />
                    </div>

                )
            })
        }
        if (this.state.totalGivingFlag) {
            totalGiving = (
                <div style={{ margin: "130px" }}>
                    {/* <img src={emptyplaceholder} width="300px" height="200px" alt="" /> */}
                    <h6 style={{ font: "Bookman" }}>You owe nothing</h6>
                </div>
            )

        }
        else {
            totalGiving = this.state.totalGivingData.map((data) => {
                return (
                    <div>
                        <TotalGiving key={data.ref_groupid} totalGiveData={data} />
                    </div>

                )
            })
        }
        console.log(this.state);
    return(
    <div >
        <DashHeader/>
        <main className="Middle">
        <div className="MidDash">
            <div className="DashHeader" >
                <h3>Dashboard</h3>
                <div className="total">
                    <div className="fitting">
                        <label htmlFor="">total balance</label>
                        <p className="green">{this.state.totalBalance} </p>
                    </div>
                    <div className="fitting">
                        <label htmlFor="">you owe</label>
                        <p style = {{color:"red"}}>{this.state.totalNegativeBalance}</p>
                    </div>
                    <div className="fitting">
                        <label htmlFor="">you are owed</label>
                        <p className="green">{this.state.totalPositiveBalance}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="totalCollection">
        <div>
          <label htmlFor="">YOU OWE</label>
        </div>
        <div>
          <label htmlFor="" className="float-right mr-4">
            YOU ARE OWED
          </label>
        </div>
      </div>
      <div className = "flex">
        <div className="float-left ml-3 borders">
            {totalGiving}
        </div>
        <div className="float-left ml-3 borders">
            {totalOwe}
        </div>
      </div>
        </main>
    </div>
)
}
}

