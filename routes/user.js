const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware");
const usersSchema = require("../controllers/users");

router.get("/signup", usersSchema.renderSignup);

router.post("/signup", wrapAsync(usersSchema.signup));

router.get(
  "/login",

  usersSchema.renderLogin
);

router.post(
  "/login",
  savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  usersSchema.Login
);

router.get("/logout", usersSchema.Logout);
module.exports = router;
