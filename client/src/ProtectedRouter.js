import React from "react";
import { Route, Redirect } from "react-router-dom";
import Load from "./components/Load";

//ISSUE: First, it redirects to '/' and then APP.JS recognizes that as an absolute router
//to the homepage, which then loads the intermediary, which then just loads Dashboard once the auth
//has worked. This is a significant issue that needs to be resolved.
//
//
export const ProtectedRoute = ({
  component: Comp,
  loggedIn,
  loading,
  ...rest
}) => {
  const chooseDisplay = (props) => {
    if (loading === true) {
      return <Load></Load>;
    } else {
      if (loggedIn === true) {
        return <Comp {...props} />;
      } else {
        return <Redirect to="/" />;
      }
    }
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return chooseDisplay(props);
      }}
    />
  );
};
