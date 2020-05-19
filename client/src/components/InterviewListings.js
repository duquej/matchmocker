import React, { Component } from "react";
import { Table, Tag, Space, Divider } from "antd";

class InterviewListings extends Component {
  state = {};

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
      },

      {
        title: "Date and Time",
        dataIndex: "datetime",
        key: "datetime",
      },
      {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (tags) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a>Accept Request</a>
            <a>View More</a>
          </Space>
        ),
      },
    ];

    const data = [
      {
        key: "1",
        name: "Jonathan Duque",
        datetime: "5/23/20 2:55 PM",
        tags: ["Python", "Dynamic Programming"],
      },
      {
        key: "2",
        name: "Jim Green",
        datetime: "5/25/20 1:55 PM",
        tags: ["Java", "Data Structures"],
      },
      {
        key: "3",
        name: "Joe Black",
        datetime: "6/23/20 1:25 PM",
        tags: ["C++", "Anything"],
      },
    ];

    return (
      <div>
        <h2>Interview Listings</h2>
        <Divider></Divider>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default InterviewListings;
