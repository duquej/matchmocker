import React, { Component } from "react";
import { List, Typography } from "antd";

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

export default CompletedInterviews;
