import React, { Component } from 'react';
import cookie from "react-cookies";
import axios from 'axios';

import Select from 'react-select';
import { Redirect } from 'react-router'
import DashHeader from '../components/DashHeader';

export class RecentActivity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recentactivity: [],
            emptyStateFlag: false,
            selectedOption: "",
            groups: [],
            groupsFlag: false,
            activitiesValue: "",
            activitiesFlag: false,
            orderByValue: "",
            orderByFlag: false
        }
    }
    handleChange = e => {
        console.log("here")
        console.log(e.value);
        this.setState({
            activitiesValue: e.value,
            activitiesFlag: true
        })
        var obj = {
            userID: cookie.load('id'),
            groupID: e.value,
            orderBy: 'DESC'
        };
        axios
            .post(  "http://localhost:3001/groups/recentactivitybygroups", obj).then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    if (response.data.length === 0) {
                        this.setState({
                            emptyStateFlag: true
                        })
                    }
                    else {
                        this.setState({
                            recentactivity: response.data,
                            emptyStateFlag: false
                        })
                    }
                    //window.location.assign("/users/dashboard")
                }
            }).catch(err => {
                if (err.response == null) {

                }
                else {

                }
                // toast.error(err.response.data);
            })
    }
    handleOrderByChange = e => {
        this.setState({
            orderByFlag: true,
            orderByValue: e.value
        })
        if (this.state.activitiesFlag) {
            var obj = {
                userID: cookie.load('id'),
                groupID: this.state.activitiesValue,
                orderBy: e.value
            }
            axios
                .post(  "http://localhost:3001/groups/recentactivitybygroups", obj).then(response => {
                    if (response.status === 200) {
                        console.log(response.data);
                        if (response.data.length === 0) {
                            this.setState({
                                emptyStateFlag: true
                            })
                        }
                        else {
                            this.setState({
                                recentactivity: response.data,
                                emptyStateFlag: false
                            })
                        }
                        //window.location.assign("/users/dashboard")
                    }
                });
        }
        else {
            var obj = {
                userID: cookie.load('id'),
                groupID: null,
                orderBy: e.value
            }
            axios
                .post(  "http://localhost:3001/groups/recentactivitybygroups", obj).then(response => {
                    if (response.status === 200) {
                        console.log(response.data);
                        if (response.data.length === 0) {
                            this.setState({
                                emptyStateFlag: true
                            })
                        }
                        else {
                            this.setState({
                                recentactivity: response.data,
                                emptyStateFlag: false
                            })
                        }
                        //window.location.assign("/users/dashboard")
                    }
                });
        }
    }
    async componentDidMount() {
        const userID = cookie.load("id");
        const response = await axios.get(  "http://localhost:3001/groups/activities/" + userID);
        console.log(response.data);
        // const groupResponse = await axios.get(  "http://localhost:3001/groups/totalgroups/" + userID);
        // groupResponse.data.map((groups) => {
        //     this.setState({
        //         groups: [...this.state.groups, groups]
        //     })
        // })
        response.data.map((recentactivity) => {
            this.setState({
                recentactivity: [...this.state.recentactivity, recentactivity]
            })
        })
        if (this.state.recentactivity.length === 0) {
            this.setState({
                emptyStateFlag: true
            })
        }
        // console.log(this.state);
    }
    onClear = () => {
        window.location.reload();
    };
    render() {
        console.log(this.state.recentactivity);
        let redirectTo = null;
        if (!(cookie.load("auth"))) {
            redirectTo = <Redirect to="/" />
        }
        console.log(this.state);
        let orderByOptions = [
            { value: 'DESC', label: 'Most Recent First' },
            { value: 'ASC', label: 'Most Recent Last' },
        ]
        let groupOptions = this.state.groups.map(function (group) {
            return { value: group.groupid, label: group.groupname };
        })
        let recentactivityDetails = null;
        if (this.state.emptyStateFlag) {
            recentactivityDetails = (
                <div style={{ margin: "200px" }}>
                    <h4 style={{ font: "Bookman" }}>No activities!</h4>
                </div>
            )

        }
        else {
            recentactivityDetails = this.state.recentactivity.map((group, index) => {
                let groupDivision = null;
                let groupPayingDivision = null;
                let amount = group.amount / group.count;
                amount = amount.toFixed(2);
                let getAmount = 0;
                if (group.count === 2) {
                    getAmount = amount / 2;
                }
                else if (group.count === 1) {
                    getAmount = amount;
                }
                else {
                    getAmount = (group.count - 1) * amount;
                }
                getAmount = Number(getAmount).toFixed(2);
                if (Number(group.settleFlag) > 0) {
                    groupDivision = <p style={{ fontSize: "20px" }}><b>"{group.username}"</b> and <b>"{group.settlename}"</b> settled up in <b>"{group.groupname}".</b></p>
                    groupPayingDivision = <div ><b> {group.currency} dues cleared  </b></div>
                }
                else {
                    if (group.ref_paidby === cookie.load('id')) {
                        groupDivision = <p style={{ fontSize: "20px" }}><b>You</b> updated <b>"{group.description}"</b> in <b>"{group.groupname}". </b></p>
                        groupPayingDivision = <div ><b>You get back {group.currency} {getAmount}</b></div>
                    }
                    else {
                        groupDivision = <p style={{ fontSize: "18px" }}><b>"{group.username}"</b> added <b>"{group.description}"</b> in <b>"{group.groupname}".</b></p>
                        groupPayingDivision = <div><b>You owe {group.currency} {amount}</b></div>
                    }
                }
                return (
                    <div>                        
                        <div className="row" style={{ height: "100px", borderBottom: "0.01px solid lightgrey", borderLeft: "0.01px solid lightgrey", borderRight: "0.01px solid lightgrey", borderWidth: "thin", marginLeft: "-14px",backgroundColor:"#EEEEEE" }}>
                            <div className="col-2">
                            </div>
                            <div className="col-8" style={{ marginTop: "20px", marginLeft: "5px", zIndex: "100", position: "relative"  }}>
                                {groupDivision}
                                <div style={{ marginTop: "-15px", color: "grey" }}>
                                    {groupPayingDivision}
                                    {/* {moment(group.createdat).tz(cookie.load("timezone")).format("MMM")} */}
                                    {' '}
                                    {/* {moment(group.createdat).tz(cookie.load("timezone")).format("D")} */}
                                </div>
                            </div>
                        </div>
                    </div >
                )
            });
        }
        return (
            <div className="row">
                <DashHeader/>
                    {redirectTo}
                <div className="col-3 p-1 m-3">
                    {/* <Select
                        style={{ width: "300px", marginLeft: "-30px","marginTop":"30px" }}
                        name="form-field-name"
                        onChange={this.handleChange}
                        labelKey='name'
                        valueKey='groupid'
                        placeholder="Select a particular group for recent activities"
                        options={groupOptions}
                    />
                    <Select
                        style={{ width: "400px", marginLeft: "-30px", "marginTop":"30px" }}
                        name="form-field-name"
                        onChange={this.handleOrderByChange}
                        placeholder="Select Order by"
                        options={orderByOptions}
                    /> */}
                    {/* <button class="btn btn-info" style={{ marginLeft: "100px", marginTop: "20px", backgroundColor: "#20BF9F" }} onClick={this.onClear}>Clear Value</button> */}

                </div>
                <div className="col-6">

                    <div className="row" style={{ marginTop:"20px",height: "80px", backgroundColor: "grey" }}>
                        <strong style={{ marginTop: "20px" ,marginLeft:"20px", fontSize: "30px" }}>Recent Activity</strong>
                    </div>
                    {recentactivityDetails}
                </div>
            </div>
        )
    }
}

export default RecentActivity