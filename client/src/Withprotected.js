import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "./auth";

class Withprotected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      displayRedirect: false,
    };
  }

  componentDidMount() {
    auth.isAuthenticated().then((res) => {
      if (!res) {
        this.setState({ displayRedirect: true });
        return;
      }
      this.setState({ loading: false });
    });
  }

  render() {
    const Component = this.props.component;

    return this.state.displayRedirect == true ? (
      <Redirect to={`/`}></Redirect>
    ) : (
      <Route render={(props) => <Component {...props} />} />
    );
  }
}

export default Withprotected;
