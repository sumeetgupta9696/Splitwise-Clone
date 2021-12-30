import React, { Component } from 'react'
import axios from 'axios';
import cookie from "react-cookies";
import AsyncSelect from 'react-select/async'
import { Redirect } from 'react-router'
import DashHeader from '../components/DashHeader';

export class EditGroup extends Component {
    constructor(props){
        super(props);
        console.log(this.props.location.state.groupData);
    }
    state = {
        groupID : this.props.location.state.groupData.groupID,
        groupName : this.props.location.state.groupData.groupName
    }
    handleInputChange = inp => {
            this.setState({
                [inp.target.name]: inp.target.value
            })
    }
    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
                        axios
                .post("http://localhost:3001/groups/edit", this.state).then(response => {
                    if(response.status === 200){
                        window.location.assign("/Mygroup");
                    }
                })
                // if (!this.state.error) {
        //     console.log(this.state);
        //     axios
        //         .post(BACKEND_URL + "/groups/new", this.state).then(response => {
        //     toast.error("Please enter group members");
        //     return;
        // }
        // if (!this.state.error) {
        //     console.log(this.state);
        //     axios
        //         .post(BACKEND_URL + "/groups/new", this.state).then(response => {
        //             if (response.status === 200) {
        //                 toast.success("Group Created Successfully");
        //                 window.location.assign("/all-group");
        //                 const formData = new FormData();
        //                 formData.append('profileImage', this.state.updatedProfileImage, this.state.updatedProfileImage.name + "," + response.data.groupID)
        //                 const config = {
        //                     headers: {
        //                         'content-type': 'multipart/form-data'
        //                     }
        //                 }
        //                 axios
        //                     .post(BACKEND_URL + '/groups/uploadprofileimage', formData, config).then((response) => {
        //                         this.setState({
        //                             profileImagePath: BACKEND_URL + '/images/grouppics/' + response.data.groupID + '/' + response.data.fileName

        //                         })

        //                     }).catch(err => {
        //                         toast.error("Error in image upload")
        //                     })
        //             }

        //         }).catch(err => {
        //             if (err.response == null) {

        //             }
        //             else
        //                 toast.error(err.response.data);
        //         })
        
    }

    render() {
        return (
            <div>
                <DashHeader/>
                <div className="row" style={{ "height": "10vh" }}>
                </div>
                <div className="row" style={{ "height": "100vh" }}>
                    <div className="col-3"></div>
                    {/* <div className="col-2">
                        <img src={this.state.profileImagePath} width="200" height="200" alt="" />
                        <div className="row p-1 m-3">
                            <input style={{ "marginLeft": '20px' }} accept="image/x-png,image/gif,image/jpeg" type="file" name="profileImage" onChange={this.handleImageChange} />
                        </div>
                    </div> */}
                    <div className="col-6">
                        <h3>Edit Group</h3>
                        <h5>Change your group name here</h5>
                        <form onSubmit={this.handleSubmit} id="Login">
                            <input placeholder={this.state.groupName} type="text" id="groupName" name="groupName" style={{ "width": "300px", "marginBottom": "40px" }} onChange={this.handleInputChange} ></input>
                            <button type="submit" className="btn btn-success"  onSubmit={this.handleSubmit}>Save</button>
                        </form>
                    </div>
                </div >
            </div >
        )
    }
}
export default EditGroup