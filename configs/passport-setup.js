const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "786400352538-87drh2ra92f7k3j7qa5cbk4p9e6jon9f.apps.googleusercontent.com",
      clientSecret: "0nBJXO1oI64YK_O-rfpFKNmv",
      callbackURL: "/auth/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
    }
  )
);
