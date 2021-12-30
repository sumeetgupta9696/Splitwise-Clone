import React, { Component } from 'react'
import { Redirect } from 'react-router'
import cookie from "react-cookies";
import axios from 'axios';
// import {EditGroup} from './editgroup';
import {Link} from 'react-router-dom';
export class AcceptedGroup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            groupID: this.props.acceptedGroupData.groupid,
            groupName: this.props.acceptedGroupData.groupname,

        }
        console.log(this.props.acceptedGroupData);
    }
    leavebutton = e => {
        var object = {
            userID: cookie.load('id'),
            groupID: this.state.groupID,
            type: "leave"
        }
        axios
            .put("http://localhost:3001/groups/leave", object).then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    window.location.reload();
                }
            });
    }
    // groupbuttonClick = e => {
    //     var object = {
    //         userID: cookie.load('id'),
    //         groupID: this.state.groupID,
    //         type: "ignore"
    //     }
    //     axios
    //         .put("/groups/invite", object).then(response => {
    //             if (response.status === 200) {
    //                 console.log(response.data);
    //                 window.location.reload();
    //             }
    //         });
    // }

    render() {
        if ( !( cookie.load( "auth" )) ) {
            return <Redirect to='/login' />
        }
        // let editOption =
        //     <div>
        //     <Link className="btn btn-success" to={{
        //                 pathname: "/EditGroup", state: {
        //                     groupData: this.state
        //                 }
        //             }}>Edit</Link>
        //     </div>
        //     let GroupOption =
        //     <div>
        //     <Link className="btn btn-success" style={{"background":"#02a577","color":"black"}} to={{
        //                 pathname: "/GroupPage", state: {
        //                     groupData: this.state
        //                 }
        //             }}>Group</Link>
        //     </div>
        // let leaveOption =
        //     <div>
        //         <div>
        //             <button className="btn btn-danger" onClick={this.leavebutton} >Leave </button>
        //         </div>
        //     </div>
        // let GroupOption =
        //     <div>
        //         <div>
        //                 <button className="btn btn-danger" style={{"background":"yellow","color":"black"}} onClick={this.groupbuttonClick} >Group </button>
        //         </div>
        //     </div>
        return (
            <div>
                <div className="row" style={{ "width": "80%", "height": "150px","marginLeft" : "50px" }}>
                    <div className='col-4'>
                        <div className="row p-1 m-3" >Group Name:-<h6>{this.state.groupName}</h6></div>
                        {/* <div className="row p-1 m-3"><h2>{this.state.groupName}</h2></div>   */}
                    </div>
                    <div className="col-2">
                        <div className="row" >
                            <Link className="btn btn-success" to={{
                        pathname: "/EditGroup", state: {
                            groupData: this.state
                        }}}>Edit
                            </Link>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="row" >            <Link className="btn btn-success" style={{"background":"#02a577","color":"black"}} to={{
                        pathname: "/GroupPage", state: {
                            groupData: this.state
                        }
                    }}>Group</Link></div>
                    </div>
                    <div className="col-2" style={{marginLeft : "40px"}}>
                        <div className="row" ><button className="btn btn-danger" onClick={this.leavebutton} >Leave </button>
                    </div>
                    </div>
                    <div className="row p-4" >

                </div>
                </div>

            </div >  
        )
    }
}

export default AcceptedGroup