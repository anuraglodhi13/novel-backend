'use strict';
require('dotenv').config();

const path = require('path');
const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET,FB_CLIENT_ID,FB_CLIENT_SECRET } =  process.env;
const port = process.env.PORT || 5500;
const app = express();
const routes = require('./routes');
const connectToMongo = require('./dbConfig');
const User = require('./model/userModel');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({ secret: SESSION_SECRET, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5500/auth/google/redirect'
},
(accessToken, refreshToken, profile, cb) => {
  var myData = new User({userId:profile.id,name:profile.displayName,provider:profile.provider});
  myData.save()
    .then(item => {
      console.log("item saved to database");
    })
    .catch(err => {
      console.log("unable to save to database due to:"+err);
    });
  console.log("user profile is: ", profile)
  return cb(null, profile);
}));

passport.use(new FacebookStrategy({
  clientID: FB_CLIENT_ID,
  clientSecret: FB_CLIENT_SECRET,
  callbackURL: 'http://localhost:5500/auth/facebook/redirect'
}, function (accessToken, refreshToken, profile, done) {
  var myData = new User({userId:profile.id,name:profile.displayName,provider:profile.provider});
  myData.save()
    .then(item => {
      console.log("item saved to database");
    })
    .catch(err => {
      console.log("unable to save to database due to:"+err);
    });
  console.log("user profile is: ", profile)
  return done(null, profile);
}
));
passport.serializeUser((user, cb) => {
cb(null, user);
});

passport.deserializeUser((obj, cb) => {
cb(null, obj);
});

app.use('/', routes);
app.get("/auth/google/redirect", passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: "http://localhost:3000/welcome",
}))
app.get("/auth/facebook/redirect", passport.authenticate('facebook', {
  failureRedirect: "/",
  successRedirect: "http://localhost:3000/welcome",
}))

app.listen(port, function () {
    console.log("Express server listening on port "+port);
    connectToMongo();
    });

// app.listen(port);