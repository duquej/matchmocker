// Here's to 100 commits and a badass project
import React, { Component } from "react";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };
  }
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  loggedInStatus={this.props.loggedInStatus}
                ></Home>
              )}
            ></Route>
            <Route exact path="/dashboard" component={Dashboard}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
