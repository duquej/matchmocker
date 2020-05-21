import React, { Component } from "react";
import {
  Table,
  Tag,
  Space,
  Divider,
  message as Message,
  Popconfirm,
} from "antd";
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

  onDelete = (key) => {
    const data = this.state.interviewRequests.filter(
      (item) => item.datetime !== key
    );
    this.setState({ interviewRequests: data });
  };

  onAccept = (requesterGoogleID, requesterDocID, recordKey) => {
    const currUserGoogleID = this.props.googleID;
    const currUserEmail = this.props.email;
    const currUserName = this.props.name;

    Axios.get(
      `/api/acceptRequest?requesterGoogleID=${requesterGoogleID}&requesterDocID=${requesterDocID}&accepterGoogleID=${currUserGoogleID}&accepterEmail=${currUserEmail}&accepterName=${currUserName}`
    ).then((res) => {
      if (res.data.success === true) {
        Message.success("Successfully accepted!");
        this.onDelete(recordKey);
      } else {
        Message.error("Could not accept. Try again later.");
      }
      //refresh data.
    });

    //Get user current info...so users email and googleID
    //Get original posters email and googleID
    //Now, update fullfilled field in the original posters and add the accepters info to the
    //original document.
    //Make a copy of the doc and put accepted doc into a new collection.
  };

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
            <Popconfirm
              title="Are you sure you want to accept this request?"
              onConfirm={() => {
                this.onAccept(
                  record.googleID,
                  record.datetime,
                  record.datetime
                );
              }}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">accept request</a>
            </Popconfirm>
            <a
              key="list-loadmore-more"
              href={`/dashboard/displayRequest?googleID=${record.googleID}&docID=${record.datetime}`}
            >
              more
            </a>
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
