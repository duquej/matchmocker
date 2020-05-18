// Here's to 100 commits and a badass project
import React, { Component } from "react";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import UserProvider from "./contexts/UserProvider";
import { ProtectedRoute } from "./ProtectedRouter";
import Withprotected from "./Withprotected";

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
          <UserProvider>
            <Withprotected
              path="/dashboard"
              component={Dashboard}
            ></Withprotected>
          </UserProvider>

          <Route exact path="/" component={Home}></Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
