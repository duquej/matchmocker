import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  Tooltip,
  DatePicker,
  Divider,
  Alert,
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
    redirect: false,
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

    const key = "updatable";
    Message.loading({ content: "Loading...", key });
    axios
      .get(
        `/api/addRequest?email=${this.props.email}&introduction=${introduction}&datetime=${datetime}&googleID=${this.props.googleID}&name=${name}&topic=${topic}&slanguage=${slanguage}&planguage=${planguage}&zoomlink=${zoomlink}&doclink=${doclink}`
      )
      .then((res) => {
        this.setState({ loading: false });

        if (res.data.success === false) {
          Message.error({
            content: "An error occured. Try again later",
            key,
          });
        } else {
          Message.success({
            content: "Successfully submitted!",
            key,
            duration: 2,
          });

          this.setState({ redirect: true });
        }
      })
      .catch((err) => {
        Message.error({
          content:
            "There was an error trying to reach the server. Please try again later.",
          key,
        });
      });
  };

  render() {
    const mainForm = (
      <div>
        <Alert
          message="Issues or suggestions? Contact us!"
          description="If you encounter any issues or would like to see any changes, please either email me at jd849@cornell.edu or submit a github issue."
          type="info"
          showIcon
          closable
        />
        <br></br>
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
              onChange={(dateObj, dateString) => {
                console.log(dateString);
                this.setState({ datetime: dateString });
              }}
              showTime={{ use12Hours: true, format: "hh:mm a" }}
              format="MM-DD-YYYY hh:mm a"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
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

    return this.state.redirect ? (
      <Redirect
        to={`/dashboard/formsuccess?googleID=${this.props.googleID}&docID=${this.state.datetime}`}
      ></Redirect>
    ) : (
      mainForm
    );
  }
}

export default InterviewForm;
