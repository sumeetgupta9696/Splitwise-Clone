import React, { Component } from 'react'
import cookie from "react-cookies";
// import profilePhoto from '../../images/default-pic.png'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
export class TotalGiving extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupName: this.props.totalGiveData.groupname,
            userid1: this.props.totalGiveData.userid1,
            userid2: this.props.totalGiveData.userid2,
            ref_groupid: this.props.totalGiveData.ref_groupid,
            amount: this.props.totalGiveData.amount,
            data: this.props.totalGiveData.totalOwe,
            tamount: this.props.totalGiveData.tamount,
            sessionID : cookie.load('id'),
            currency : this.props.totalGiveData.currency,
        }
    };
    handleSubmit = e => {
        e.preventDefault();
        axios.post("http://localhost:3001/expense/givingsettleup", this.state).then(response => {
            if (response) {
                alert("Settle Up is done !");
                window.location.reload();
            }
            else {

            }
        });

        console.log(this.state);
    }
    render() {
        console.log(this.state);
        return (
            <form onSubmit={this.handleSubmit} id="totalOwe">

                <div style={{marginLeft: "50px", marginTop:"50px",marginBottom:"50px" }} >
                    <div className="row" style={{ backgroundColor: "" }}>
                    <div className="row" style={{ }}>
                        <button type="submit" style={{ backgroundColor: "#FF6337", height:"20px", marginTop:"20px" }} class="btn btn-primary btn-sm" onSubmit={this.handleSubmit}>Settle-Up</button>
                    </div>
                        <div className="col-2">                            
                        {/* <img src={} width="70px" height="70px" alt="" style={{ borderRadius: "50px" }} /> */}
                        </div>
                        <div className="col-3">
                            <div style={{ marginTop: "20px" }}>{this.state.data}</div>
                        </div>
                        <div className="col-3">
                            <div style={{  marginTop: "20px", color: "#FF8C00" }}>{this.state.tamount}</div>
                        </div>
                        <span style={{ marginLeft: "20px",marginTop: "20px" }} >in</span>
                        <div className="col-3">
                            <div style={{ marginLeft: "10px",marginTop: "20px" }}>{this.state.groupName}</div>
                        </div>
                        <div className="row">
                            {/* <button type="submit" style={{ backgroundColor: "#FF8C00" }} class="btn btn-primary btn-sm" onSubmit={this.handleSubmit}>Settle-Up</button> */}
                        <ToastContainer />
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default TotalGiving