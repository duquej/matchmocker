import React, { Component } from "react";
import { Spin } from "antd";
import "./Load.css";

class Load extends Component {
  state = {};
  render() {
    return (
      <div className="center-item">
        <Spin size="large" tip="Loading..."></Spin>
      </div>
    );
  }
}

export default Load;
