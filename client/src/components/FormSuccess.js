import React, { Component } from "react";
import { Button, Result, Typography } from "antd";
import { Link } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Paragraph, Text } = Typography;

class FormSuccess extends Component {
  constructor(props) {
    super(props);

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let googleID = params.get("googleID");
    let docID = params.get("docID");

    this.state = {
      googleID: googleID,
      docID: docID,
    };
  }

  render() {
    return (
      <div>
        <Result
          status="success"
          title="Successfully Published Interview Request"
          subTitle="You may check the status of your interview request on your dashboard or by clicking the 'view post' button below. You will also get an email notification once someone has accepted your interview request!"
          extra={[
            <Button type="primary" key="viewPost">
              <Link
                to={`/dashboard/displayRequest?googleID=${this.state.googleID}&docID=${this.state.docID}`}
              >
                View Post
              </Link>
            </Button>,
            <Button key="dashboard">
              <Link to="/dashboard"> Return to Dashboard</Link>
            </Button>,
          ]}
        >
          <div className="desc">
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 16,
                }}
              >
                Next possible steps:
              </Text>
            </Paragraph>
            <Paragraph>
              <InfoCircleOutlined /> Keep an eye on your inbox.
            </Paragraph>
            <Paragraph>
              <InfoCircleOutlined /> Consider helping interview someone else.
            </Paragraph>
          </div>
        </Result>
      </div>
    );
  }
}

export default FormSuccess;
