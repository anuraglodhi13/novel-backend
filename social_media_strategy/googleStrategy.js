const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const { Strategy } = require("passport-google-oauth20");
const passport = require("passport");
const User = require("../model/userModel");

const googleStrategy = new Strategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://novel-backend.onrender.com/auth/google/redirect",
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate(
      { userId: profile.id },
      {
        name: profile.displayName,
        provider: profile.provider,
      },
      (err, user) => {
        console.log(err + user);
        if (err) {
          console.error("Error finding or creating user:", err);
        }
        console.log("Profile created or found :" + profile);
      }
    );
    return cb(null, profile);
  }
);

module.exports = googleStrategy;
