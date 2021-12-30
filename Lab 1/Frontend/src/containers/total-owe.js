import React, { Component } from 'react'
import cookie from "react-cookies";
// import profilePhoto from '../../images/profile-icon.png'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export class TotalOwe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupName: this.props.totalOweData.groupname,
            userid1: this.props.totalOweData.userid1,
            userid2: this.props.totalOweData.userid2,
            ref_groupid: this.props.totalOweData.ref_groupid,
            tamount: this.props.totalOweData.tamount,
            data: this.props.totalOweData.totalOwe,
            currency : this.props.totalOweData.currency,
            sessionID : cookie.load('id'),
            amount : this.props.totalOweData.amount
        }
    };
    handleSubmit = e => {
        e.preventDefault();
        axios.post("http://localhost:3001/expense/owingsettleup", this.state).then(response => {
            if(response){
                alert("Settled up is done !");
                window.location.reload();
            }
            else{

            }
        });

    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} id="totalOwe">
                <div style={{ margin: "50px" }} >

                    <div className="row" style={{ backgroundColor: "" }}>
                    <div className="row" style={{ }}>
                        <button type="submit" style={{ backgroundColor: "#02a577", height:"20px", marginTop:"20px" }} class="btn btn-primary btn-sm" onSubmit={this.handleSubmit}>Settle-Up</button>
                    </div>
                        <div className="col-3">
                            <div style={{ marginTop: "20px" }}>{this.state.data}</div>
                        </div>
                        <div className="col-3">
                            <div style={{ marginTop: "20px", color: "#20BF9F" }}>{this.state.tamount}</div>
                        </div>
                        <span style={{ marginLeft: "30px",marginTop: "20px" }} >in</span>
                        <div className="col-3">
                            <div style={{ marginLeft: "10px", marginTop: "20px" }}>{this.state.groupName}</div>
                        </div>

                </div>
                <ToastContainer />
             </div>


            </form>

        )
    }
}

export default TotalOwe