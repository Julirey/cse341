// Needed Resources
const express = require("express");
const router = express.Router();
const musicRoute = require("./musicRoute");
const usersRoute = require("./usersRoute");

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

module.exports = router;
