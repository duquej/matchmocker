import React, { Component } from "react";
import { Modal, Button, Form, Input, Divider } from "antd";
import Axios from "axios";

class ReportModal extends Component {
  state = {
    visible: false,
    value: "",
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  reportSuccess(reportID) {
    Modal.success({
      title: `Success! Report ID: ${reportID}`,
      content: `Report submitted successfully! Rest assured that we will review your report and take appropriate actions as necessary. Here is the report ID for reference: ${reportID}`,
    });
  }

  reportError() {
    Modal.error({
      title: "Uh oh..",
      content:
        "An error has occured trying to submit your report. Try again later.",
    });
  }

  onSubmitReport = () => {
    Axios.get(
      `/api/submitReport?reportedGoogleID=${this.props.reportedUserGoogleID}&reportedUserName=${this.props.reportedUserName}&reporterGoogleID=${this.props.reporterGoogleID}&reporterUserName=${this.props.reporterUserName}&reportedReason=${this.state.value}`
    )
      .then((res) => {
        if (res.data.success === true) {
          this.reportSuccess(res.data.data);
          this.setState({ visible: false, value: "" });
        } else {
          this.reportError();
        }
      })
      .catch((err) => {
        this.reportError();
        this.setState({ visible: false, value: "" });
      });
  };

  render() {
    return (
      <div>
        <Button type="primary" danger size="small" onClick={this.showModal}>
          Report User
        </Button>
        <Modal
          title={`Report ${this.props.reportedUserName}`}
          visible={this.state.visible}
          okText="Submit Report"
          onOk={this.onSubmitReport}
          onCancel={this.handleCancel}
        >
          <p>
            You may report users who are abusing interview requests, spamming,
            posting abusive content, or are harassing you/others.
          </p>
          <Divider></Divider>
          <Form.Item
            name={["user", "reason"]}
            label="Reason"
            rules={[
              {
                message: "Please state your reason for reporting.",
                required: true,
              },
            ]}
          >
            <Input onChange={(e) => this.setState({ value: e.target.value })} />
          </Form.Item>
        </Modal>
      </div>
    );
  }
}

export default ReportModal;
