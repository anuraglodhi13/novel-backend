const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = process.env;
const TwitterStrategy = require("passport-twitter").Strategy; // Import TwitterStrategy
const passport = require("passport");
const User = require("../model/userModel");
const { BACK_END_DOMAIN } = process.env;

const xStrategy = new TwitterStrategy(
  {
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: BACK_END_DOMAIN + `/auth/twitter/redirect`,
  },
  function (token, tokenSecret, profile, cb) {
    User.findOrCreate(
      { userId: profile.id },
      {
        name: profile.displayName,
        provider: profile.provider,
        profilePicture: profile.profile_image_url,
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

module.exports = xStrategy;
