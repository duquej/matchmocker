import React, { Component } from "react";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import UserProvider from "./contexts/UserProvider";
import { ProtectedRoute } from "./ProtectedRouter";
import Intermediary from "./Intermediary";
import ReactGA from "react-ga";
import auth from "./auth";

ReactGA.initialize(process.env.ANALYTICS_API_KEY);

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: false,
    };
  }

  componentDidMount = () => {
    console.log("Page view.");

    auth.isAuthenticated().then((resp) => {
      this.setState({ loggedInStatus: resp });
    });

    ReactGA.pageview(window.location.pathname + window.location.search);
  };
  componentDidUpdate = () => {
    console.log("Page View");
    ReactGA.pageview(window.location.pathname + window.location.search);
  };

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <UserProvider>
            <Route
              path="/dashboard"
              loggedIn={this.state.loggedInStatus}
              component={Dashboard}
            />
            <Route exact path="/" component={Intermediary}></Route>
          </UserProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
