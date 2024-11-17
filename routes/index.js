// Needed Resources
const express = require("express");
const router = express.Router();
const contactsRoute = require("./contactsRoute");

// Route to call swagger
router.use("/", require("./swaggerRoute"));

// Route to welcome the user
router.get("/", (req, res) => {
  //#swagger.tags=["Hello World"]
  res.send("Hello World");
});

// Route to call contact functions
router.use("/contacts", contactsRoute);

module.exports = router;
