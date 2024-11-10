// Needed Resources
const express = require("express");
const router = express.Router();

// Route to welcome the user
router.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
