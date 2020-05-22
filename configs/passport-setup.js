const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const functions = require("../db-functions.js");
const keys = require("./keys.js");

passport.serializeUser((userID, done) => {
  done(null, userID);
});

passport.deserializeUser((userID, done) => {
  functions
    .returnUserFromUserID(userID)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      console.log("an error has occured.");
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      const profileJson = profile._json;
      functions
        .handleUserLogin(
          profileJson.sub,
          profileJson.name,
          profileJson.picture,
          profileJson.email
        )
        .then(done(null, profileJson.sub))
        .catch((err) =>
          console.log("An error has occured handling user login")
        );
    }
  )
);
