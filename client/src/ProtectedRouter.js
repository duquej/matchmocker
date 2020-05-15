import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const resp = auth.isAuthenticated();
        if (resp) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    ></Route>
  );
};
