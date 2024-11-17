// Needed Resources
const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contactsController");

// Route to get data of all contacts
router.get("/", contactsController.getContacts);

// Route to get data of a contact by id
router.get("/:id", contactsController.getContactsById);

// Route to create contact
router.post("/", contactsController.createContact);

// Route to create update contact info
router.put("/:id", contactsController.updateContact);

// Route to delete contact
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
