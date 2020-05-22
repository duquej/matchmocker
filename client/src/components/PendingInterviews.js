import React, { Component } from "react";
import { List, Typography, Divider, Popconfirm, Badge } from "antd";
import "./PendingInterviews.js";
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
                <a
                  key="list-loadmore-edit"
                  href={`/api/editRequest?docID=${item.datetime}&googleID=${this.props.googleID}`}
                >
                  edit
                </a>,

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

                <a
                  key="list-loadmore-more"
                  href={`/dashboard/displayRequest?googleID=${this.props.googleID}&docID=${item.datetime}`}
                >
                  more
                </a>,
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
