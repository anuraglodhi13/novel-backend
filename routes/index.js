"use strict";
const express = require("express");
const passport = require("passport");
const router = express.Router();
const { REDIRECT_URL } = process.env;

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
    failureRedirect: "/",
    successRedirect: REDIRECT_URL + "/dashboard",
  })
);
router.get(
  "/auth/facebook/redirect",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    successRedirect: REDIRECT_URL + "/dashboard",
  })
);
router.get(
  "/auth/twitter/redirect",
  passport.authenticate("twitter", {
    failureRedirect: "/",
    successRedirect: REDIRECT_URL + "/dashboard",
  })
);

router.get(
  "/auth/discord/redirect",
  passport.authenticate("discord", {
    failureRedirect: "/", // Redirect to home page on failure
    successRedirect: REDIRECT_URL + "/dashboard", // Redirect to welcome page on success
  })
);
module.exports = router;
