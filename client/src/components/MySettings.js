import React, { Component } from "react";
import {
  Divider,
  Form,
  Input,
  Button,
  Popconfirm,
  Alert,
  message as Message,
} from "antd";
import Axios from "axios";
import "./MyInterviews.css";

class MySettings extends Component {
  state = {};

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      console.log("props updateds");
    }
  }

  onDelete = () => {
    Axios.get(`/api/deleteAccount?googleID=${this.props.googleID}`)
      .then((res) => {
        window.location.href = "/";
      })
      .catch((err) => {
        Message.error(
          "An error occured trying to communicate with the server. Try again later."
        );
      });
  };

  render() {
    const layout = {
      labelCol: {
        span: 7,
      },
      wrapperCol: {
        span: 10,
      },
    };

    return (
      <div>
        <Alert
          message="You cannot currently change your display name. This feature will be available soon."
          type="info"
          showIcon
          closable
        />
        <br></br>
        <h2 className="center">Basic Settings</h2>
        <Divider></Divider>
        <Form {...layout} name="basic-settings">
          <Form.Item name={["user", "name"]} label="Name: ">
            <Input placeholder={`${this.props.name}`} disabled />
          </Form.Item>
          <Form.Item name={["user", "email"]} label="Email">
            <Input placeholder={`${this.props.email}`} disabled />
          </Form.Item>
          <Form.Item name={["user", "displayName"]} label="Display Name">
            <Input placeholder={`${this.props.name}`} disabled />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
            <Popconfirm
              title="Are you sure you want to delete your account?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                this.onDelete();
              }}
            >
              <Button type="primary" danger>
                Delete Account
              </Button>
            </Popconfirm>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default MySettings;
