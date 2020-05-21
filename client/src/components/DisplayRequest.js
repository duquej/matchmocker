import React, { Component } from "react";
import { Descriptions, Button, Divider, message as Message } from "antd";
import Axios from "axios";

class DisplayRequest extends Component {
  state = {
    loading: true,
    datetime: "",
    pLanguage: "",
    sLanguage: "",
    topic: "",
    zoomlink: "",
    userPostedGoogleID: "",
    completed: "",
    userEmail: "",
    docLink: "",
    fullfilled: "",
    introduction: "",
    userName: "",
    signedInGoogleID: "",
    fullfilled: "",
  };

  onCompletion = () => {
    console.log("clicked submit");
    Axios.get(
      `/api/requestCompleted?requesterGoogleID=${this.state.userPostedGoogleID}&docID=${this.state.datetime}&accepterGoogleID=${this.state.accepterGoogleID}`
    ).then((res) => {
      if (res.data.success === true) {
        Message.success("Successfully marked post as completed!");
        this.setState({ completed: true });
      } else {
        Message.error(
          "An error occured trying to set this request to completed."
        );
      }
    });
  };

  getAcceptedInfo = (fullfilled) => {
    if (fullfilled) {
      console.log(this.state.accepterName);
      return (
        <>
          <Divider></Divider>
          <Descriptions
            title={`Accepted by ${this.state.accepterName}`}
            layout="vertical"
            bordered={false}
          >
            <Descriptions.Item label="Acceptor">
              {this.state.accepterName}
            </Descriptions.Item>
            <Descriptions.Item label="Acceptor Email">
              {this.state.accepterEmail}
            </Descriptions.Item>
          </Descriptions>
        </>
      );
    }
  };

  onAccept = () => {
    //we need the ID of the person who accepted the request, and
    //we also need to email the other person. {luckily, we have the relevant user info passed down to us!}
    //so we need to make two database calls.
  };
  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let googleID = params.get("googleID");
    let docID = params.get("docID");

    Axios.get(`/api/getRequest?googleID=${googleID}&docID=${docID}`)
      .then((res) => {
        const requestInfo = res.data.data;

        const acceptorName =
          requestInfo.fullfilled === true ? requestInfo.accepter.name : "";
        const acceptorEmail =
          requestInfo.fullfilled === true ? requestInfo.accepter.email : "";

        const acceptorGoogleID =
          requestInfo.fullfilled === true ? requestInfo.accepter.googleID : "";

        this.setState({
          loading: false,
          datetime: requestInfo.datetime,
          userName: requestInfo.name,
          pLanguage: requestInfo.planguage,
          introduction: requestInfo.introduction,
          topic: requestInfo.topic,
          userPostedGoogleID: requestInfo.googleID,
          fullfilled: requestInfo.fullfilled,
          accepterEmail: acceptorEmail,
          accepterName: acceptorName,
          accepterGoogleID: acceptorGoogleID,
          completed: requestInfo.completed,
        });
      })
      .catch((err) => {
        console.log(err);
        Message.error("Could not load the interview request, try again later.");
      });
  }

  render() {
    let button;
    let title;
    if (
      !(this.props.googleID === this.state.userPostedGoogleID) &&
      this.state.fullfilled === false
    ) {
      button = <Button type="primary">Accept Request</Button>;
      title = `[Pending] Interview Request`;
    } else if (
      this.props.googleID === this.state.userPostedGoogleID &&
      this.state.fullfilled === false
    ) {
      title = `[Pending] Interview Request`;
    } else if (
      this.props.googleID === this.state.userPostedGoogleID &&
      this.state.fullfilled === true &&
      this.state.completed == false
    ) {
      title = `[Accepted] Interview Request`;
      button = (
        <Button type="primary" onClick={() => this.onCompletion()}>
          Mark as Completed
        </Button>
      );
    } else {
      title = `[Completed] Interview Request`;
    }

    let loadDisplay;

    if (this.state.loading === false) {
      loadDisplay = (
        <div>
          <Descriptions title={title} layout="vertical" bordered={false}>
            <Descriptions.Item label="Name">
              {this.state.userName}
            </Descriptions.Item>
            <Descriptions.Item label="Introduction" span={2}>
              {this.state.introduction}
            </Descriptions.Item>
            <Descriptions.Item label="Interview Date and Time">
              {this.state.datetime}
            </Descriptions.Item>

            <Descriptions.Item label="Interview Topic">
              {this.state.topic}
            </Descriptions.Item>

            <Descriptions.Item label="Programming Language">
              {this.state.pLanguage}
            </Descriptions.Item>
          </Descriptions>
          {this.getAcceptedInfo(this.state.fullfilled)}
          <Divider></Divider>
          <div>{button}</div>
        </div>
      );
    } else loadDisplay = <h1></h1>;

    return loadDisplay;
  }
}

export default DisplayRequest;
