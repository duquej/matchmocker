import React, { useContext, useState } from "react";
import UserProvider from "./contexts/UserProvider";
import _ from "lodash";

const LoginMsg =
  "Uh oh, there's nothing to show! " +
  "Login to see how much of your invaluable personal " +
  "data tech companies have at their disposal.";

const Profile = () => {
  const [selected, setSelected] = useState("All");
  const userData = useContext(UserProvider.context);
  const text = _.isEmpty(userData) ? LoginMsg : "Explore Your Data";

  return (
    <div className="page">
      <p className="page-title" style={{ textAlign: "center" }}>
        {text}
      </p>

      <div style={{ marginBottom: 20 }} />
    </div>
  );
};

export default Profile;
