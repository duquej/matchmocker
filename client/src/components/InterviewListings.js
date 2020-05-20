import React, { Component } from "react";
import { Table, Tag, Space, Divider, message as Message } from "antd";
import Axios from "axios";

class InterviewListings extends Component {
  state = {
    loading: true,
    interviewRequests: [],
  };

  componentDidMount() {
    Axios.get(`/api/getAllRequests`)
      .then((res) => {
        const allData = res.data.data;
        console.log(allData);
        this.setState({ loading: false, interviewRequests: allData });
      })
      .catch((err) => {
        Message.error("Could not fetch all interview requests");
      });
  }
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },

      {
        title: "Date and Time",
        dataIndex: "datetime",
        key: "datetime",
      },
      {
        title: "Programming Language",
        key: "planguage",
        dataIndex: "planguage",
      },

      {
        title: "Topic",
        key: "topic",
        dataIndex: ["topic"],
        render: (tag) => (
          <>
            {
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            }
          </>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a>accept request</a>
            <a>view more</a>
          </Space>
        ),
      },
    ];

    return (
      <div>
        <h2>Interview Listings</h2>
        <Divider></Divider>
        <Table
          columns={columns}
          dataSource={this.state.interviewRequests}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default InterviewListings;
