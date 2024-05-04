"use strict";
require("dotenv").config();

const path = require("path");
const express = require("express");
const passport = require("passport");

const { SESSION_SECRET } = process.env;
const bodyParser = require("body-parser");
const port = process.env.PORT || 5500;
const app = express();
const routes = require("./routes/index");
const claudeRoute = require("./routes/claude");
const stripeRoute = require("./routes/stripe");
const dbFile = require("./dbConfig");
const GoogleStrategy = require("./social_media_strategy/googleStrategy");
const FacebookStrategy = require("./social_media_strategy/facebookStrategy");
const TwitterStrategy = require("./social_media_strategy/xStrategy");
const DiscordStrategy = require("./social_media_strategy/discordStrategy");

// const isAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.status(401).json({ message: "Unauthorized" });
// };

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token'"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(
  require("express-session")({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

passport.use("google", GoogleStrategy);
passport.use("facebook", FacebookStrategy);
passport.use("twitter", TwitterStrategy);
passport.use("discord", DiscordStrategy);

app.use("/", routes);
app.use("/stripe", stripeRoute);
app.use("/claude", claudeRoute);
app.listen(port, function () {
  console.log("Express server listening on port " + port);
  dbFile.connectToMongo();
});
