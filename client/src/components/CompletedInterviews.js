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
                  key="list-loadmore-more"
                  href={`/dashboard/displayRequest?googleID=${this.props.googleID}&docID=${item.datetime}`}
                >
                  more
                </a>,
              ]}
            >
              <div>
                [Completed]
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
