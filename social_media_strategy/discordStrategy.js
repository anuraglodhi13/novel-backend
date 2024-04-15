const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = process.env;
const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const User = require("../model/userModel");

const discordStrategy = new DiscordStrategy(
  {
    clientID: DISCORD_CLIENT_ID,
    clientSecret: DISCORD_CLIENT_SECRET,
    callbackURL: "https://novel-backend.onrender.com/auth/discord/redirect",
    scope: ["identify", "email"], // Adjust scopes as needed
  },
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate(
      { userId: profile.id },
      {
        name: profile.username,
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

module.exports = discordStrategy;
