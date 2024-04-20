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
const dbFile = require("./dbConfig");
const GoogleStrategy = require("./social_media_strategy/googleStrategy");
const FacebookStrategy = require("./social_media_strategy/facebookStrategy");
const TwitterStrategy = require("./social_media_strategy/xStrategy");
const DiscordStrategy = require("./social_media_strategy/discordStrategy");
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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

passport.use("google", GoogleStrategy);
passport.use("facebook", FacebookStrategy);
passport.use("twitter", TwitterStrategy);
passport.use("discord", DiscordStrategy);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.use("/", routes);
app.use("/claude", claudeRoute);
app.listen(port, function () {
  console.log("Express server listening on port " + port);
  dbFile.connectToMongo();
});
