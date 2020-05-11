import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button, Tooltip, message as Message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import "./Fields.css";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { span: 0 },
};

export class Fields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      url: "",
      loading: false,
      showSuccessModal: false,
      classesWithoutLinks: [],
    };
  }

  onFinish = () => {
    // Set state for loading for button spinner
    this.setState({ loading: true });

    const { email, url } = this.state;
    const key = "/shared/schedule/";

    const keyIndex = url.indexOf(key);
    const idIndex = keyIndex + key.length;

    const schedulerId = url.substring(idIndex);

    // Retrieve schedule info from API
    axios
      .get(`/api/schedule?email=${email}&id=${schedulerId}`)
      .then((res) => {
        this.setState({ loading: false });
        console.log(res);
        if (res.data.success === true) {
          // Only load success modal prompt when there is at least one unlinked class
          if (res.data.unlinkedClasses.length > 0) {
            // Pop up with success modal
            console.log("Setting showSuccessModal to true...");
            this.setState({
              showSuccessModal: true,
              classesWithoutLinks: res.data.unlinkedClasses,
            });
          } else {
            Message.success(`Successfully registered with ${email}`);
          }
        } else {
          const errorMsg =
            res && res.data.message && res.data.message.length > 0
              ? res.data.message
              : "Unable to sign up at the moment. Please try again later";
          console.log(errorMsg);
          Message.error(errorMsg);
        }
      })
      .catch(() => {
        this.setState({ loading: false });
        Message.error(
          "Unable to sign up at the moment. Please try again later"
        );
      });
  };

  render() {
    return (
      <React.Fragment>
        <Form
          {...layout}
          style={{ marginTop: "24px" }}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Button type="primary"> Sign in with Google</Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default Fields;
