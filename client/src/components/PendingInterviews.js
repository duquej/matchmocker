import React, { Component } from "react";
import { List, Typography, Divider, Popconfirm, Badge } from "antd";
import "./PendingInterviews.js";
import { Link } from "react-router-dom";
const { Text } = Typography;

class PendingInterviews extends Component {
  state = {
    morphedData: false,
  };

  render() {
    return (
      <div>
        <Divider orientation="left"></Divider>
        <h2>My Pending Interviews</h2>
        <List
          bordered
          loading={this.props.loading}
          dataSource={this.props.pendingInterviews}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Popconfirm
                  title="Are you sure you want to delete this request?"
                  onConfirm={() => {
                    this.props.onDelete(this.props.googleID, item.datetime);
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <a href="#">delete</a>
                </Popconfirm>,

                <Link
                  to={`/dashboard/displayRequest?googleID=${this.props.googleID}&docID=${item.datetime}`}
                >
                  more
                </Link>,
              ]}
            >
              <div>
                {!item.fullfilled ? (
                  <Badge status="error" text="[Unfullfilled] " />
                ) : (
                  <Badge status="processing" text="[Accepted] " />
                )}
                &nbsp;
                {item.topic} Interview at {item.datetime}
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default PendingInterviews;
