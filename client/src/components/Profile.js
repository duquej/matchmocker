import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Divider,
  Tag,
  Button,
  Comment,
  Avatar,
  Form,
  Input,
  List,
  message as Message,
} from "antd";
import Axios from "axios";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./Profile.css";
import ReportModal from "./ReportModal";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(item) => (
      <Comment
        author={
          <a href={`/dashboard/profile?googleID=${item.submittedByGoogleID}`}>
            {item.submittedByName}
          </a>
        }
        avatar={
          <Avatar
            src={item.submittedProfilePic}
            alt=""
            content={<p>{item.comment}</p>}
          />
        }
        content={<p>{item.comment}</p>}
      />
    )}
  />
);
const Editor = ({ onChange, onSubmit, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class Profile extends Component {
  constructor(props) {
    super(props);

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let googleID = params.get("googleID");

    this.state = {
      profileLoading: true,
      commentLoading: true,
      comment: "",
      comments: [],
      profileGoogleID: googleID,
      profilePic: "",
      profileName: "",
      profileCategory: "",
    };
  }

  getProfileCommentsAndUpdateState = () => {
    Axios.get(`/api/getProfileComments?googleID=${this.state.profileGoogleID}`)
      .then((res) => {
        if (res.data.success === true) {
          this.setState({ comments: res.data.data, commentLoading: false });
        } else {
          Message.error(
            "An error occured trying to retrieve this profiles comments"
          );
        }
      })
      .catch((err) => {
        Message.error(
          "An error occured trying to communicate with the server. Try again later."
        );
      });
  };

  getProfileAndUpdateState = () => {
    Axios.get(`/api/getProfileInfo?googleID=${this.state.profileGoogleID}`)
      .then((res) => {
        if (res.data.success === true) {
          this.setState({
            profilePic: res.data.data.profilePic,
            profileName: res.data.data.username,
            profileCategory: res.data.data.group,
            profileLoading: false,
          });
        } else {
          Message.error(
            "An error has occured trying to get the user's profile info."
          );
        }
      })
      .catch((err) => {
        Message.error(
          "An error occured trying to reach the servers. Try again later."
        );
      });
  };

  componentDidMount() {
    this.getProfileAndUpdateState();
    this.getProfileCommentsAndUpdateState();
  }

  onSubmitComment = () => {
    console.log("clicked");
    Axios.get(
      `/api/submitComment?profileGoogleID=${this.state.profileGoogleID}&comment=${this.state.comment}&submittedByGoogleID=${this.props.googleID}&submittedByName=${this.props.name}&submittedProfilePic=${this.props.profilePic}`
    )
      .then((res) => {
        if (res.data.success === true) {
          Message.success("Successfully posted comment.");
          this.setState({
            commentLoading: false,
            comment: "",
            comments: [
              {
                submittedByName: this.props.name,
                submittedProfilePic: this.props.profilePic,
                submittedByGoogleID: this.props.googleID,
                comment: <p>{this.state.comment}</p>,
              },
              ...this.state.comments,
            ],
          });
        } else {
          Message.error("An error occured submitting your comment.");
        }
      })
      .catch((err) => {
        Message.error("An error occured trying to communicate with the server");
      });
  };

  render() {
    return (
      <div>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card
              bordered={true}
              style={{ marginBottom: 24 }}
              loading={this.state.profileLoading}
            >
              <div>
                <div className="avatarHolder">
                  <img
                    alt=""
                    src={this.state.profilePic}
                    className="avatarImg"
                  ></img>
                  <div className="avatarName">{this.state.profileName}</div>
                  <Tag
                    key="admin"
                    color={
                      this.state.profileCategory === "Member" ? "blue" : "red"
                    }
                  >
                    {this.state.profileCategory}
                  </Tag>
                </div>
                <div>
                  <p className="detailParagraph">
                    <i className="detailTitle" />
                    <CheckCircleOutlined />
                    {` Interviews Completed: NA`}
                  </p>
                </div>
                <Divider dashed />
                <ReportModal
                  reportedUserGoogleID={this.state.profileGoogleID}
                  reportedUserName={this.state.profileName}
                  reporterGoogleID={this.props.googleID}
                  reporterUserName={this.props.name}
                ></ReportModal>
              </div>
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card bordered={true} loading={this.state.commentLoading}>
              {this.state.comments.length > 0 && (
                <CommentList comments={this.state.comments} />
              )}

              <Comment
                avatar={<Avatar src={this.props.profilePic} alt="Han Solo" />}
                content={
                  <Editor
                    onChange={(e) => this.setState({ comment: e.target.value })}
                    onSubmit={this.onSubmitComment}
                    value={this.state.comment}
                  />
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
