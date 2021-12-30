import React, { Component } from 'react'
import { Redirect } from 'react-router'
import cookie from "react-cookies";
import axios from 'axios';
;

export class IndividualGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupID: this.props.groupData.groupid,
            groupName: this.props.groupData.groupname,

        }
        console.log(this.props.groupData);
    }
    acceptButtonClick = e => {
        var object = {
            userID: cookie.load('id'),
            groupID: this.state.groupID,
            type: "accept"
        }
        axios
            .put( "http://localhost:3001/groups/invite", object).then(response => {
                if (response.status === 200) {
                    console.log(response.data);

                    window.location.reload();

                }
            });
    }
    ignorebuttonClick = e => {
        var object = {
            userID: cookie.load('id'),
            groupID: this.state.groupID,
            type: "ignore"
        }
        axios
            .put("http://localhost:3001/groups/invite", object).then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    window.location.reload();
                }
            });
    }

    render() {
        if ( !( cookie.load( "auth" )) ) {
            return <Redirect to='/login' />
        }
        let addOption =
            <div>
                <div >
                    <button className="btn btn-success" onClick={this.acceptButtonClick} >Accept </button>
                </div>
            </div>

        let ignoreOption =
            <div>
                <div>
                    <button className="btn btn-danger" onClick={this.ignorebuttonClick} >Ignore </button>
                </div>
            </div>
        return (
            <div>
                <div className="row" style={{ "width": "80%", "height": "100px","marginLeft" : "50px" }}>
                    <div className='col-4'>
                    <div className="row p-1 m-3" >Group Name:-<h6>{this.state.groupName}</h6></div>
                        {/* <div className="row p-1 m-3" ></div>
                        <div className="row p-1 m-3"><h2>{this.state.groupName}</h2></div> */}
                    </div>
                    {/* <div className="row p-4" style={{marginLeft : "160px"}}> */}
                    <div className="col-2" style={{marginTop:"50px"}}>
                        <div className="row" ><h6>{addOption}</h6></div>
                    </div>
                    <div className="col-2" style={{marginLeft : "40px",marginTop:"50px"}}>
                        <div className="row" ><h6>{ignoreOption}</h6></div>
                    </div>
                {/* </div> */}
                </div>

            </div >
            
        )
    }
}

export default IndividualGroup