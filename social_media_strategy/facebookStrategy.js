const { FB_CLIENT_ID, FB_CLIENT_SECRET } = process.env;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const User = require("../model/userModel");
const { BACK_END_DOMAIN } = process.env;

const facebookStrategy = new FacebookStrategy(
  {
    clientID: FB_CLIENT_ID,
    clientSecret: FB_CLIENT_SECRET,
    callbackURL: BACK_END_DOMAIN + `/auth/facebook/redirect`,
  },
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate(
      { userId: profile.id },
      {
        name: profile.displayName,
        provider: profile.provider,
        profilePicture: profile.profileUrl,
      },
      (err, user) => {
        console.log(err + user);
        if (err) {
          console.error("Error finding or creating user:", err);
        }
      }
    );
    console.log("Profile created or found :" + profile);
    return cb(null, profile);
  }
);

module.exports = facebookStrategy;
