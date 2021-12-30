import React, { Component } from 'react'
import axios from 'axios';
import cookie from "react-cookies";
import AsyncSelect from 'react-select/async'
import splitwiselogo from "../images/logo.png"
import { Redirect } from 'react-router'
import DashHeader from '../components/DashHeader';

export class NewGroup extends Component {
    state = {
        userID: cookie.load('id'),
        groupName: "",
        selectedUsers: [],
        groupError: false,
        emailRadioButton: false,
        nameRadioButton: false,
        error: false,
        errorMessage: "",
        photo:""

    }
    loadOptionsForName = async (inp, callback) => {
        const response = await axios.get("http://localhost:3001/users/searchbyname?name_like=" + inp);
        callback(response.data.map(i => ({
            label: i.username,
            value: i.id
        })));
    }
    loadOptionsForEmail = async (inp, callback) => {
        const response = await axios.get("http://localhost:3001/users/searchbyemail?email_like=" + inp);
        console.log(response.data);
        callback(response.data.map(i => ({
            label: i.email,
            value: i.id
        })));
    }

    handleImageChange = e => {
        this.setState({
            updatedProfileImage: e.target.files[0],
            profileImageUpdate: true
        })
    }
    handleRadioButtonChange = (event) => {
        console.log(event.target.value);
        if (event.target.value === "email") {
            this.setState({
                emailRadioButton: true,
                nameRadioButton: false
            })
        }
        else {
            this.setState({
                nameRadioButton: true,
                emailRadioButton: false
            })
        }
    }
    handleInputChange = inp => {
            this.setState({
                [inp.target.name]: inp.target.value
            })
    }
    handleSelectChange = (selectedUsers) => {
        this.setState({
            selectedUsers: selectedUsers

        })
    }
    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        if (this.state.groupName === "") {
            return;
        }
        if (this.state.selectedUsers.length !== 0) {
                        axios
                .post("http://localhost:3001/groups/new", this.state).then(response => {
                    if(response.status === 200){
                        window.location.assign("/Dashboard");
                    }
                })
        }
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
        let redirectTo = null;
        if (!(cookie.load("auth"))) {
            redirectTo = <Redirect to="/" />
        }
        let gError = null
        let emailDivision = null
        let nameDivision = null
        if (this.state.groupError) {
            gError = <div style={{ 'color': 'red' }}>{this.state.groupErrorMessage}</div>
        }
        if (this.state.name) {
            gError = <div style={{ 'color': 'red' }}>""</div>
        }
        if (this.state.nameRadioButton) {
            nameDivision = <AsyncSelect
                isMulti
                value={this.state.selectedUsers}
                onChange={this.handleSelectChange}
                placeholder={'Type username for members'}
                loadOptions={this.loadOptionsForName}
            />
        }
        if (this.state.emailRadioButton) {
            emailDivision = <AsyncSelect
                isMulti
                value={this.state.selectedUsers}
                onChange={this.handleSelectChange}
                placeholder={'Type email for members'}
                loadOptions={this.loadOptionsForEmail}
            />
        }
        return (
            <div>
                { redirectTo}
                <DashHeader/>
                <div className="row" style={{ "height": "10vh" }}>
                </div>
                <div className="row" style={{ "height": "100vh" }}>
                    <div className="col-3"></div>
                        <h5>Please enter your group name:</h5>
                        <form onSubmit={this.handleSubmit} style={{"marginLeft":"10px"}} id="Login">
                            <input placeholder={this.state.groupName} type="text" id="groupName" name="groupName" style={{ "width": "300px", "marginBottom": "40px" }} onChange={this.handleInputChange} ></input>
                            <div onChange={this.handleRadioButtonChange}>
                                <input style={{marginLeft : "20px"}}type="radio" value="name" name="search" /> Add members
                            </div>
                            {nameDivision}
                            {emailDivision}
                            {gError}
                            <button type="submit" className="btn btn-success" style={{backgroundColor:"#02a577",marginTop: "20px"}} onSubmit={this.handleSubmit}>Save</button>
                        </form>
                </div >
            </div >
        )
    }
}
export default NewGroup