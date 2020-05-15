import React, { Component } from "react";
import { Layout, Avatar, Divider } from "antd";

import "./MyInterviews.css";
import PendingInterviews from "./PendingInterviews";

class MyInterviews extends Component {
  state = {};

  getFullInterviewHistory = () => {
    const { googleID } = this.props.googleID;
  };

  render() {
    return (
      <div className="center">
        <h2>Welcome, {this.props.username}</h2>
        <PendingInterviews></PendingInterviews>
      </div>
    );
  }
}

export default MyInterviews;
