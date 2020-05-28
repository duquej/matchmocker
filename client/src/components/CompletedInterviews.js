import React, { Component } from "react";
import { List, Typography, Badge } from "antd";
import { Link } from "react-router-dom";

const { Text } = Typography;

class CompletedInterviews extends Component {
  state = {};
  render() {
    return (
      <div>
        <h2>Completed Interviews</h2>
        <List
          bordered
          loading={this.props.loading}
          dataSource={this.props.completedInterviews}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Link
                  to={`/dashboard/displayRequest?googleID=${this.props.googleID}&docID=${item.datetime}`}
                >
                  more
                </Link>,
              ]}
            >
              <div>
                <Badge status="success" text="[Completed]"></Badge> &nbsp;
                {item.topic} Interview at {item.datetime}
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default CompletedInterviews;
