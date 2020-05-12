const express = require("express");
const app = express();
const cors = require("cors");
const passportSetup = require("./configs/passport-setup");
const passport = require("passport");
const path = require("path");

app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

app.get(
  "/api/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/auth/redirect", passport.authenticate("google"), (req, res) => {});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
