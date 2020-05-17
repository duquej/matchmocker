import React, { Component } from "react";
import { List, Typography, Divider, message as Message } from "antd";
import "./PendingInterviews.js";
import Axios from "axios";
const { Text } = Typography;

class PendingInterviews extends Component {
  state = {
    morphedData: false,
  };

  render() {
    return (
      <div>
        <Divider orientation="left"></Divider>
        <h2>Pending Interviews</h2>
        <List
          bordered
          loading={this.props.loading}
          dataSource={this.props.pendingInterviews}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a
                  key="list-loadmore-edit"
                  href={`/api/editRequest?docID=${item.datetime}&googleID=${this.props.googleID}`}
                >
                  edit
                </a>,
                <a
                  key="list-delete"
                  onClick={() => {
                    this.props.onDelete(this.props.googleID, item.datetime);
                  }}
                >
                  delete
                </a>,
                <a key="list-loadmore-more">more</a>,
              ]}
            >
              <div>
                <Text type="danger">[Unfullfilled] </Text>
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
