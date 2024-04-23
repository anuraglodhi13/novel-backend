"use strict";
const express = require("express");
const passport = require("passport");
const router = express.Router();
const { FRONT_END_DOMAIN } = process.env;

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);
router.get(
  "/login/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);
router.get("/login/twitter", passport.authenticate("twitter"));

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/login/discord",
  passport.authenticate("discord", {
    scope: ["identify", "email"],
  })
);

router.get(
  "/auth/google/redirect",
  passport.authenticate("google", {
    failureRedirect: FRONT_END_DOMAIN + "/login",
  }),
  function (req, res) {
    const userId = req.user.id;
    res.redirect(FRONT_END_DOMAIN + "/aistoryteller?userId=" + userId);
  }
);
router.get(
  "/auth/facebook/redirect",
  passport.authenticate("facebook", {
    failureRedirect: FRONT_END_DOMAIN + "/login",
  }),
  function (req, res) {
    const userId = req.user.id;
    res.redirect(FRONT_END_DOMAIN + "/aistoryteller?userId=" + userId);
  }
);
router.get(
  "/auth/twitter/redirect",
  passport.authenticate("twitter", {
    failureRedirect: FRONT_END_DOMAIN + "/login",
  }),
  function (req, res) {
    const userId = req.user.id;
    res.redirect(FRONT_END_DOMAIN + "/aistoryteller?userId=" + userId);
  }
);

router.get(
  "/auth/discord/redirect",
  passport.authenticate("discord", {
    failureRedirect: FRONT_END_DOMAIN + "/login",
  }),
  function (req, res) {
    const userId = req.user.id;
    res.redirect(FRONT_END_DOMAIN + "/aistoryteller?userId=" + userId);
  }
);
module.exports = router;
