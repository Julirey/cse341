// Needed Resources
const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contactsController");

// Route to get data of all contacts
router.get("/", contactsController.getContacts);

// Route to get data of a contact by id
router.get("/:id", contactsController.getContactsById);

module.exports = router;
