"use strict";
const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/", (req, res, next) => {
  const { user } = req;
  res.render("home", { user });
});

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
router.get("/login/twitter", passport.authenticate("twitter")); // Twitter authentication route
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

router.get("/login/discord", passport.authenticate("discord", {
  scope: ["identify", "email"],
}));

router.get(
  "/return",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res, next) => {
    res.redirect("/");
  }
);

module.exports = router;
