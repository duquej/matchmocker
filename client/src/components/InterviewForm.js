import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Tooltip,
  DatePicker,
  Divider,
  message as Message,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};

class InterviewForm extends Component {
  state = {
    loading: false,
    email: this.props.email,
    googleID: this.props.googleID,
    introduction: "",
    datetime: "",
    name: "",
    topic: "",
    slanguage: "",
    planguage: "",
    zoomlink: "",
    doclink: "",
  };

  onFinish = () => {
    this.setState({ loading: true });
    const {
      introduction,
      datetime,
      name,
      topic,
      slanguage,
      planguage,
      zoomlink,
      doclink,
    } = this.state;
    axios
      .get(
        `/api/addRequest?email=${this.props.email}&introduction=${introduction}&datetime=${datetime}&googleID=${this.props.googleID}&name=${name}&topic=${topic}&slanguage=${slanguage}&planguage=${planguage}&zoomlink=${zoomlink}&doclink=${doclink}`
      )
      .then((res) => {
        this.setState({ loading: false });

        if (res.data.success === false) {
          Message.error(
            "There was an error trying to publish your interview requst. Please try again later."
          );
        } else {
          Message.success("Request successfully published!");
        }
      })
      .catch((err) => {
        Message.error(
          "There was an error trying to reach the server. Please try again later."
        );
      });
  };

  render() {
    return (
      <div>
        <h2 {...layout}>Request an Interview </h2>
        <Divider></Divider>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={this.onFinish}
          //validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input onBlur={(e) => this.setState({ name: e.target.value })} />
          </Form.Item>

          <Form.Item
            name={["user", "introduction"]}
            label="Introduction"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              onBlur={(e) => this.setState({ introduction: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name={["user", "topic"]}
            label="Interview Topic"
            rules={[
              { required: true, message: "Please choose an interview topic" },
            ]}
          >
            <Select
              placeholder="Select interview topic"
              onChange={(e) => {
                this.setState({ topic: e });
              }}
            >
              <Option value="Data Structures">Data Structures</Option>
              <Option value="Dynamic Programming">Dynamic Programming</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name={["user", "language"]}
            label="Language Spoken"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select language spoken"
              onChange={(e) => {
                this.setState({ slanguage: e });
              }}
            >
              <Option value="English">English</Option>
              <Option value="Spanish">Spanish</Option>
              <Option value="Mandarin">Mandarin</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name={["user", "planguage"]}
            label="Language Desired"
            rules={[
              {
                required: true,
                message: "Please choose a programming language",
              },
            ]}
          >
            <Select
              placeholder="Select programming language"
              onChange={(e) => this.setState({ planguage: e })}
            >
              <Option value="Java">Java</Option>
              <Option value="Python">Python</Option>
              <Option value="C++">C++</Option>
              <Option value="C#">C#</Option>
              <Option value="Javascript">javascript</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name={["user", "zoomlink"]}
            label="Zoom Link"
            rules={[
              {
                required: true,
                message: "Please provide a zoom link",
              },
            ]}
          >
            <Input
              onBlur={(e) => {
                this.setState({ zoomlink: e.target.value });
              }}
            ></Input>
          </Form.Item>

          <Form.Item
            name={["user", "doclink"]}
            label="Google Doc"
            rules={[
              {
                required: true,
                message: "Please provide a pair programming doc",
              },
            ]}
          >
            <Input
              onBlur={(e) => this.setState({ doclink: e.target.value })}
              suffix={
                <Tooltip
                  title={
                    <p style={{ margin: "0" }}>
                      This can be a link to a google doc where you and your
                      interviewer can both see live coding
                    </p>
                  }
                >
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            ></Input>
          </Form.Item>

          <Form.Item
            name="date-time-picker"
            label="Interview Date"
            rules={[{ required: true, message: "Please pick a time and date" }]}
          >
            <DatePicker
              onChange={(e) => {
                this.setState({ datetime: e._i });
              }}
              showTime
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default InterviewForm;