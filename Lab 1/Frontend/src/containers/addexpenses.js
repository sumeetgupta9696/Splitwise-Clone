import React, { Component } from 'react'
import cookie from "react-cookies";
import axios from 'axios';
export class AddExpense extends Component {
    constructor(props) {
        super(props);
        if (this.props.groupData.groupImagePath == null) {
            this.state = {
                groupID: this.props.groupData.groupID,
                groupName: this.props.groupData.groupName,
                // groupImagePath:  + '/images/avatar.png',
                currency: cookie.load('defaultcurrency'),
                userID: cookie.load('id'),
                description: "",
                amount: "",
                amountFlag: false
            }
        }
        else {
            this.state = {
                groupID: this.props.groupData.groupID,
                groupName: this.props.groupData.groupName,
                // groupImagePath: this.props.groupData.groupImagePath,
                currency: cookie.load('defaultcurrency'),
                userID: cookie.load('id'),
                description: "",
                amount: "",
                amountFlag: false,
            }
        }
    }
    handleInputChange = inp => {
        if (inp.target.value <= 0) {
            this.setState({
                amountFlag: true
            })
        }
        else
        {
            this.setState({
                amountFlag : false,
                [inp.target.name]: inp.target.value
            })
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        if (!this.state.amountFlag) {
            console.log(this.state);
            axios
                .post( "http://localhost:3001/groups/expenses", this.state).then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        console.log(response);
                    }
                }).catch(err => {
                    if (err.response == null) {

                    }
                    else {

                    }
                    alert(err.response.data);
                })
        }
        else{

        }
        window.location.reload();
    }
    render() {
        let renderError = null;
        if (this.state.amountFlag) {
            renderError = <span style={{ marginTop: '-220px', color: "red" }}>Please enter correct value</span>
        }
        return (
            <div>
                <div class="container">
                    <div class="row" style={{ backgroundColor: "#02a577", color: 'white' }}>
                        <p style={{ "marginLeft": "160px", marginTop: "10px", fontWeight: "100px" }}>
                            Add an Expense</p>
                    </div>
                    {/* <div class="row" style={{ "backgroundColor": "whitesmoke" }} >
                        <p style={{ "margin": "10px" }}>
                            With <b>you</b> and:
                            <img style={{ marginLeft: "10px", "borderRadius": "200px" }} src={this.state.groupImagePath} width="20" height="20" alt="" />
                            All of <b>{this.state.groupName}</b>
                        </p>
                    </div>
                    <div class="row" >
                        <h1></h1>
                    </div>
                    <div class="row" >
                        <h1></h1>
                    </div>
                    <div class="row" >
                        <h1></h1>
                    </div> */}
                    <div class="row" >
                        <div className="col-1">
                        </div>
                        {/* <div className="col-3">
                            <img src={description} width="100px" height="100px" alt="" />
                        </div> */}
                        <div className="col-5">
                            <form onSubmit={this.props.closePopUp} id="Login">
                                <input placeholder="Enter Description" type="text" id="description" name="description" style={{ marginLeft:"80px",border: "0", borderBottom: "2px solid", marginTop:"10px" }} onChange={this.handleInputChange} ></input>
                                <div className="row">
                                    <input value={cookie.load('defaultcurrency')} size="4" style={{ marginTop: "10px", marginLeft: "20px", marginRight: "5px", border: "0", marginBottom: "-13px" }}></input>  <input placeholder="0.00" type="number" size="7" id="amount" name="amount" style={{ border: "0", borderBottom: "2px solid", marginTop: "20px", marginLeft: "90px" }} onChange={this.handleInputChange} ></input>
                                </div>
                                <button type="Submit" className="btn btn-amber" style={{ "backgroundColor": "#02a577", "marginLeft": "10px", "marginTop":"10px" }} onClick={this.handleSubmit}>Add</button>
                                <button className="btn btn-danger" style={{ "backgroundColor":"#FF6337","marginLeft": "10px", "marginTop":"10px" }} onClick={this.props.closePopUp}>Close</button>
                            </form>
                        </div>
                    </div>
                    {renderError}
                </div>
            </div>
        )
    }
}
export default AddExpense