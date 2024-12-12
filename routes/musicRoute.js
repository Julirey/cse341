// Needed Resources
const express = require("express");
const router = express.Router();
const musicController = require("../controllers/musicController");
const utilities = require("../middleware/");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

// Route to get data of all Music
router.get("/", utilities.handleErrors(musicController.getMusic));

// Route to get data of a music by id
router.get("/:id", utilities.handleErrors(musicController.getMusicById));

// Route to create music
router.post(
  "/",
  isAuthenticated,
  validation.musicRules(),
  validation.validate,
  utilities.handleErrors(musicController.createMusic)
);

// Route to create update music info
router.put(
  "/:id",
  isAuthenticated,
  validation.musicRules(),
  validation.validate,
  utilities.handleErrors(musicController.updateMusic)
);

// Route to delete music
router.delete(
  "/:id",
  isAuthenticated,
  utilities.handleErrors(musicController.deleteMusic)
);

module.exports = router;
