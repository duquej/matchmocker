const express = require("express");
const app = express();
const cors = require("cors");
const passportSetup = require("./configs/passport-setup");
const passport = require("passport");
const path = require("path");
const cookieSession = require("cookie-session");
const functions = require("./db-functions.js");

app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["johnappletoestee"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/api/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/auth/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/dashboard");
});

app.get("/user", (req, res) => {
  console.log("user called...");
  res.send(req.user);
});

app.get("/", (req, res) => {
  console.log("called.");
  //if (req.user) {
  //  res.redirect("/dashboard");
  //}
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/api/deleteRequest", (req, res) => {
  const { docID, googleID } = req.query;
  functions
    .deleteUserInterviewRequest(docID, googleID)
    .then((data) => {
      console.log(data);
      res.send({ success: true, data: data });
    })
    .catch((err) => {
      res.send({ success: false, message: err });
    });
});

app.get("/api/getAllRequests", (req, res) => {
  const { googleID } = req.query;
  functions
    .getAllUserRequestsFromID(googleID)
    .then((resp) => {
      res.send({ success: true, data: resp });
    })
    .catch((err) => {
      res.send({ success: false, message: err });
    });
});

app.get("/api/addRequest", (req, res) => {
  const {
    email,
    googleID,
    introduction,
    datetime,
    name,
    topic,
    slanguage,
    planguage,
    zoomlink,
    doclink,
  } = req.query;
  functions
    .handleNewInterviewRequest(
      email,
      googleID,
      introduction,
      datetime,
      name,
      topic,
      slanguage,
      planguage,
      zoomlink,
      doclink
    )
    .then((msg) => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false, message: err });
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
