// Needed Resources
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const utilities = require("../middleware/");
const validation = require("../middleware/validate");

// Route to get data of all users
router.get("/", utilities.handleErrors(usersController.getUsers));

// Route to get data of a user by id
router.get("/:id", utilities.handleErrors(usersController.getUserById));

// Route to create a user
router.post(
  "/",
  validation.usersRules(),
  validation.validate,
  utilities.handleErrors(usersController.createUser)
);

// Route to create update user info
router.put(
  "/:id",
  validation.usersRules(),
  validation.validate,
  utilities.handleErrors(usersController.updateUser)
);

// Route to delete user
router.delete("/:id", utilities.handleErrors(usersController.deleteUser));

module.exports = router;
