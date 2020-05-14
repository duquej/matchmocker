import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button, Tooltip, message as Message } from "antd";

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
      loading: false,
      showSuccessModal: false,
    };
  }

  onFinish = () => {
    axios
      .get(`/api/google`)
      .then((res) => {
        this.setState({ loading: false });
        console.log(res);
      })
      .catch(() => {
        this.setState({ loading: false });
        Message.error("Unable to sign in");
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
          <a href="/api/google">
            <Button type="primary"> Sign in with Google</Button>
          </a>
        </Form>
      </React.Fragment>
    );
  }
}

export default Fields;
