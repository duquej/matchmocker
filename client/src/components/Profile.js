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
import "./Profile.css";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class Profile extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    console.log("Component mounted.");
  }

  onSubmitComment = (
    profileGoogleID,
    comment,
    submittedByGoogleID,
    submittedByName,
    submittedProfilePic
  ) => {
    Axios.get(
      `/api/submitComment?profileGoogleID=${profileGoogleID}&comment=${comment}&submittedByGoogleID=${submittedByGoogleID}&submittedByName=${submittedByName}&submittedProfilePic=${submittedProfilePic}`
    )
      .then((res) => {
        if (res.data.success === true) {
          console.log("success");
        }
      })
      .catch((err) => {
        Message.error("An error occured tryiing to submit your comment.");
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
              loading={this.state.loading}
            >
              <div>
                <div className="avatarHolder">
                  <img
                    alt=""
                    src={this.props.profilePic}
                    className="avatarImg"
                  ></img>
                  <div className="avatarName">{this.props.name}</div>
                  <Tag key="admin" color="red">
                    Site Administrator
                  </Tag>
                </div>
                <div>
                  <p className="detailParagraph">
                    <i className="detailTitle" />
                    {`Interviews Completed: 9`}
                  </p>
                  <p className="detailParagraph">
                    <i className="detailGroup" />
                    {`Group A`}
                  </p>
                </div>
                <Divider dashed />
                <Button size="small" danger disabled>
                  Report User
                </Button>
              </div>
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card bordered={true} loading={false}>
              <Comment
                avatar={<Avatar src={this.props.profilePic} alt="Han Solo" />}
                content={
                  <Editor
                  //onChange={this.handleChange}
                  //onSubmit={this.handleSubmit}
                  //submitting={submitting}
                  //value={value}
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
