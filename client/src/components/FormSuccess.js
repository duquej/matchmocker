import React, { Component } from "react";
import { Progress } from "antd";

class FormSuccess extends Component {
  state = {};
  render() {
    return (
      <div>
        <Progress type="circle" percent={100} />
      </div>
    );
  }
}

export default FormSuccess;
