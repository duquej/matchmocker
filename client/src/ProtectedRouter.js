import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        auth.isAuthenticated().then((res) => {
          if (res) {
            console.log("redirecting to dashboard");
            return <Component {...props}></Component>;
          } else {
            console.log("redirecting to homepage.");
            return <Redirect to="/"></Redirect>;
          }
        });
      }}
    ></Route>
  );
};
