import React, { useContext, useState } from "react";
import UserProvider from "./contexts/UserProvider";
import _ from "lodash";
import InterviewForm from "./components/InterviewForm";
import { Route, Switch, useRouteMatch, Link, Router } from "react-router-dom";
import _ from "lodash";
import Home from "./Home";
import Dashboard from "./Dashboard";
import UserProvider from "./contexts/UserProvider";

import "antd/dist/antd.css";

const Intermediary = () => {
  const [selected, setSelected] = useState("All");
  const userData = useContext(UserProvider.context);
  const isAuthenticated = !_.isEmpty(userData);

  let match = useRouteMatch();

  return isAuthenticated ? <Home></Home> : <Dashboard></Dashboard>;
};

export default Intermediary;
