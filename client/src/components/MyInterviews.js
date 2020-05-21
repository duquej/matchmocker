import React, { Component } from "react";
import { message as Message } from "antd";

import "./MyInterviews.css";
import PendingInterviews from "./PendingInterviews";
import Axios from "axios";
import CompletedInterviews from "./CompletedInterviews";

class MyInterviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedInterviews: [],
      pendingInterviews: [],
      loading: true,
    };
  }

  parseInterviewRequestHistory = (data) => {
    var completedInterviewRequests = [];
    var pendingInterviewRequests = [];
    data.forEach((request) => {
      if (request.completed === true) {
        completedInterviewRequests.push(request);
      } else {
        pendingInterviewRequests.push(request);
      }
    });

    console.log(pendingInterviewRequests);

    this.setState({
      completedInterviews: completedInterviewRequests,
      pendingInterviews: pendingInterviewRequests,
    });
  };

  onDelete = (googleID, docID) => {
    Axios.get(`/api/deleteRequest?docID=${docID}&googleID=${googleID}`)
      .then((res) => {
        if (res.data.success === true) {
          Message.success("Post deleted");
          this.parseInterviewRequestHistory(res.data.data);
        } else {
          Message.error("Could not delete post successfully.");
        }
      })
      .catch((err) => {
        Message.error("Could not delete your request");
      });
  };

  componentDidMount() {
    this.getFullInterviewRequestsHistory();
  }

  componentDidUpdate(prevProps) {
    if (this.props.googleID !== prevProps.googleID) {
      this.getFullInterviewRequestsHistory();
    }
  }

  getFullInterviewRequestsHistory = () => {
    const googleID = this.props.googleID;
    if (this.props.googleID === undefined) {
      return;
    }
    Axios.get(`/api/getAllUserRequests?googleID=${googleID}`).then((res) => {
      if (res.data.success === false) {
        Message.error(
          "An error occured trying to retrieve your interview requests"
        );
      } else {
        this.parseInterviewRequestHistory(res.data.data);
        this.setState({ loading: false });
      }
    });
  };

  render() {
    return (
      <div className="center">
        <h2>Welcome, {this.props.username}! </h2>

        <PendingInterviews
          loading={this.state.loading}
          pendingInterviews={this.state.pendingInterviews}
          googleID={this.props.googleID}
          onDelete={this.onDelete}
        ></PendingInterviews>
        <CompletedInterviews
          completedInterviews={this.state.completedInterviews}
          googleID={this.props.googleID}
          loading={this.state.loading}
        ></CompletedInterviews>
      </div>
    );
  }
}

export default MyInterviews;
