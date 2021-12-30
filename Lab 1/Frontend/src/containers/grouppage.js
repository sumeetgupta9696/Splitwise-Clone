import React, { Component } from 'react'
import axios from 'axios';
import cookie from "react-cookies";
import AsyncSelect from 'react-select/async'
import { Redirect } from 'react-router'
import DashHeader from '../components/DashHeader';
import Modal from 'react-modal';
import AddExpense from './addexpenses';
import "../styles/Dashboard.css";
const customStyles={
    content:{
        height:"300px",
        width:"500px"
    }
}
export class GroupPage extends Component {
    constructor(props){
        super(props);
        console.log("Group page: "+this.props.location.state.groupData);
    }
    state = {
        groupID : this.props.location.state.groupData.groupID,
        groupName : this.props.location.state.groupData.groupName,
        groupPopUp:false,
        groupDetails : []

    }
    async componentDidMount(){
        const groupID = this.state.groupID;
        const response = await axios.get("http://localhost:3001/groups/description/" + groupID)
        console.log(response.data);
        response.data.map((groupDetails) => {
            this.setState({
                groupDetails: [...this.state.groupDetails, groupDetails]
            })
        })
    }
    toggleGroupPopUp = (e) => {
        console.log("closepopup");
        this.setState({
            groupPopUp: !this.state.groupPopUp
        })
    }
    handleExpense=e=>{
        console.log("add expense:"+ this.props.location.state.groupData);
    }
    render() {
       let  groupDescriptionDetails = this.state.groupDetails.map((group, index) => {
            if (group.settleFlag == null) {
                return (
                    <div className="row" style={{ height: "100px", borderBottom: "0.01px solid lightgrey", borderLeft: "0.01px solid lightgrey", borderRight: "0.01px solid lightgrey", borderWidth: "thin", marginBottom: "1px" }}>
                        <div className="col-1" style={{ margin: "20px", color: "grey" }}>
                            <div className="row">
                                {/* {moment(group.createdat).tz(cookie.load("timezone")).format("MMM")} */}

                            </div>
                            <div className="row" style={{ fontSize: "30px", marginTop: "-10px" }}>
                                {/* {moment(group.createdat).tz(cookie.load("timezone")).format("D")} */}

                            </div>
                        </div>
                        <div className="col-2">
                            {/* <img src={grocerylogo} style={{ "paddingLeft": "0%", marginLeft: "-20px", marginTop: "20px" }} width="60%" height="60%" alt="" /> */}
                        </div>
                        <div className="col-6" style={{ marginLeft: "-60px", marginTop: "30px" }}>
                            <div className="row">
                                <h3>{group.description}</h3>
                                {/* <img src={camera} style={{ margin: "8px" }} width="20px" height="20px" alt="" /> */}
                            </div>
                            <div className="row">
                                {/* {moment(group.createdat).tz(cookie.load("timezone")).format("hh:mm a")} */}

                            </div>
                        </div>
                        <div className="col-3" style={{ marginLeft: "60px", marginTop: "15px", marginRight: "-40px" }}>
                            <div className="row" style={{ color: "grey" }}>
                                {group.name}
                            </div>
                            <div className="row">
                                <h3><b>{group.currency}{group.amount}</b></h3>
                            </div>
                        </div>
                    </div>
                )
                    }
                });
                            return (
            <div>
                <DashHeader/>
                <main className="Middle">
                <div className="MidDash">
                <div className="DashHeader" >
                    <h3>{this.state.groupName}</h3>
                    <Modal isOpen={this.state.groupPopUp} style={customStyles}>
                        <AddExpense groupData = {this.state} closePopUp = {this.toggleGroupPopUp}/>
                    </Modal>
                     <button className="btn float-right settle"  onClick={this.toggleGroupPopUp}>Add Expense
                     </button> 
                </div>
                {groupDescriptionDetails}
                <div>
                </div>
                </div>
                </main>              
            </div>
        )
    }
}
export default GroupPage