// Here's to 100 commits and a badass project
import React, { Component } from "react";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import UserProvider from "./contexts/UserProvider";
import { ProtectedRoute } from "./ProtectedRouter";
import Withprotected from "./Withprotected";
import Intermediary from "./Intermediary";
import ReactGA from "react-ga";

ReactGA.initialize(process.env.ANALYTICS_API_KEY);

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };
  }

  componentDidMount = () =>
    ReactGA.pageview(window.location.pathname + window.location.search);
  componentDidUpdate = () =>
    ReactGA.pageview(window.location.pathname + window.location.search);

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <UserProvider>
            <Route path="/dashboard" component={Dashboard}></Route>
            <Route exact path="/" component={Intermediary}></Route>
          </UserProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
