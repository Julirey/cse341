// Needed Resources
const express = require("express");
const router = express.Router();
const professionalController = require("../controllers/professionalController");

// Route to get info
router.get("/", professionalController.getData);

module.exports = router;
