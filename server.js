const express = require("express");
const app = express();
const cors = require("cors");
const passportSetup = require("./configs/passport-setup");
const passport = require("passport");
const path = require("path");
const cookieSession = require("cookie-session");

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
  if (req.user) {
    res.redirect("/dashboard");
  }
});

app.get("/logout", (req, res) => {
  console.log("logout link called.");
  req.logout();
  res.redirect("/");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
