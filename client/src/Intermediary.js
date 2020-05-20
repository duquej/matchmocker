import React, { useContext, useState } from "react";
import UserProvider from "./contexts/UserProvider";
import _ from "lodash";
import { useRouteMatch } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";

import "antd/dist/antd.css";

const Intermediary = () => {
  const [selected, setSelected] = useState("All");
  const userData = useContext(UserProvider.context);
  const isAuthenticated = !_.isEmpty(userData);
  let properComp = isAuthenticated ? <Dashboard></Dashboard> : <Home></Home>;

  let match = useRouteMatch();

  return properComp;
};

export default Intermediary;
