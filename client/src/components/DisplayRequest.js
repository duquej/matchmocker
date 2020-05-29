import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Descriptions,
  Button,
  Divider,
  message as Message,
  Popconfirm,
  PageHeader,
  Tag,
} from "antd";
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
              <Link
                to={`/dashboard/profile?googleID=${this.state.accepterGoogleID}`}
              >
                {this.state.accepterName}
              </Link>
            </Descriptions.Item>
            <Descriptions.Item label="Acceptor Email">
              {this.state.accepterEmail}
            </Descriptions.Item>
          </Descriptions>
        </>
      );
    }
  };

  onAccept = (requesterGoogleID, requesterDocID) => {
    const currUserGoogleID = this.props.googleID;
    const currUserEmail = this.props.email;
    const currUserName = this.props.name;

    Axios.get(
      `/api/acceptRequest?requesterGoogleID=${requesterGoogleID}&requesterDocID=${requesterDocID}&accepterGoogleID=${currUserGoogleID}&accepterEmail=${currUserEmail}&accepterName=${currUserName}`
    ).then((res) => {
      if (res.data.success === true) {
        Message.success("Successfully accepted!");

        this.setState({
          fullfilled: true,
          accepterEmail: currUserEmail,
          accepterName: currUserName,
          accepterGoogleID: currUserGoogleID,
          completed: false,
        });
      } else {
        Message.error("Could not accept. Try again later.");
      }
    });
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
    let tags;
    if (
      !(this.props.googleID === this.state.userPostedGoogleID) &&
      this.state.fullfilled === false
    ) {
      button = (
        <Popconfirm
          title="Are you sure you want to accept this request?"
          onConfirm={() => {
            this.onAccept(this.state.userPostedGoogleID, this.state.datetime);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary">Accept Request</Button>
        </Popconfirm>
      );
      tags = <Tag color="red">Pending</Tag>;
    } else if (
      this.props.googleID === this.state.userPostedGoogleID &&
      this.state.fullfilled === false
    ) {
      tags = <Tag color="red">Pending</Tag>;
    } else if (
      this.props.googleID === this.state.userPostedGoogleID &&
      this.state.fullfilled === true &&
      this.state.completed == false
    ) {
      tags = <Tag color="blue">Accepted</Tag>;

      button = (
        <Button type="primary" onClick={() => this.onCompletion()}>
          Mark as Completed
        </Button>
      );
    } else {
      tags = <Tag color="green">Completed</Tag>;
    }

    let loadDisplay;

    if (this.state.loading === false) {
      loadDisplay = (
        <PageHeader
          title={`Interview Requested`}
          extra={[button]}
          tags={tags}
          subTitle=""
          onBack={() => <Link to="/dashboard/listings"></Link>}
        >
          <Descriptions layout="vertical" bordered={false}>
            <Descriptions.Item label="Name">
              <Link
                to={`/dashboard/profile?googleID=${this.state.userPostedGoogleID}`}
              >
                {this.state.userName}
              </Link>
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
        </PageHeader>
      );
    } else loadDisplay = <h1></h1>;

    return loadDisplay;
  }
}

export default DisplayRequest;
