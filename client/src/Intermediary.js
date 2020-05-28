import React, { useContext, useState } from "react";
import UserProvider from "./contexts/UserProvider";
import _ from "lodash";
import { useRouteMatch } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Load from "./components/Load";

import "antd/dist/antd.css";

const Intermediary = (props) => {
  const [selected, setSelected] = useState("All");
  const userData = useContext(UserProvider.context);
  const isAuthenticated = !_.isEmpty(userData);
  const properDisplayComp = () => {
    if (props.loading === true) {
      return <Load></Load>;
    } else {
      if (props.loggedInStatus === true) {
        return <Dashboard></Dashboard>;
      } else {
        return <Home></Home>;
      }
    }
  };

  return properDisplayComp();
};

export default Intermediary;
