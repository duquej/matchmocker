import React, { Component } from "react";
import { Descriptions, Button, Divider, message as Message } from "antd";
import Axios from "axios";

class DisplayRequest extends Component {
  state = {
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
        this.setState({
          datetime: requestInfo.datetime,
          userName: requestInfo.name,
          pLanguage: requestInfo.planguage,
          introduction: requestInfo.introduction,
          topic: requestInfo.topic,
          userPostedGoogleID: requestInfo.googleID,
          fullfilled: requestInfo.fullfilled,
        });
      })
      .catch((err) => {
        Message.error("Could not load the interview request, try again later.");
      });
  }

  render() {
    let button;
    if (!this.props.googleID === this.state.userPostedGoogleID) {
      button = <Button type="primary">Accept Request</Button>;
    }

    return (
      <div>
        <Descriptions
          title="Interview Request Information"
          layout="vertical"
          bordered={false}
        >
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
        <Divider></Divider>
        <div>{button}</div>
      </div>
    );
  }
}

export default DisplayRequest;
