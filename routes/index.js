// Needed Resources
const express = require("express");
const router = express.Router();
const musicRoute = require("./musicRoute");
const usersRoute = require("./usersRoute");
const passport = require("passport");

// Route to call swagger
router.use("/", require("./swaggerRoute"));

// Route to welcome the user
router.get("/", (req, res) => {
  //#swagger.tags=["Hello World"]
  res.send("Hello World");
});

// Route to call music functions
router.use("/music", musicRoute);

// Route to call users functions
router.use("/users", usersRoute);

// Route to get login status
router.get("/status", (req, res) => {
    //#swagger.tags=["Login Status"]
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out"
  );
});

// Route to get Github OAth login
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/status");
  }
);

// Route to login users
router.get("/login", passport.authenticate("github"), (req, res) => {});

// Route to logout users
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/status");
  });
});

module.exports = router;
