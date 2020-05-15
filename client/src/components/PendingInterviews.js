import React, { Component } from "react";
import { List, Typography, Divider } from "antd";
import "./PendingInterviews.js";
const { Text } = Typography;

const data = [
  "Java Interview on 5/20/2020 at 9:30 PM",
  "Python Interview at 8pm",
];

class PendingInterviews extends Component {
  state = {};
  render() {
    return (
      <div>
        <Divider orientation="left"></Divider>
        <h2>Pending Interviews</h2>
        <List
          bordered
          loading={false}
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key="list-loadmore-edit">edit</a>,
                <a key="list-delete">delete</a>,
                <a key="list-loadmore-more">more</a>,
              ]}
            >
              <div>
                <Text type="danger">[Pending] </Text>

                {item}
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default PendingInterviews;
