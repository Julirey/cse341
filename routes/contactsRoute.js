// Needed Resources
const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contactsController");
const utilities = require("../middleware/");
const validation = require("../middleware/validate");

// Route to get data of all contacts
router.get("/", utilities.handleErrors(contactsController.getContacts));

// Route to get data of a contact by id
router.get("/:id", utilities.handleErrors(contactsController.getContactsById));

// Route to create contact
router.post(
  "/",
  validation.contactRules(),
  validation.validate,
  utilities.handleErrors(contactsController.createContact)
);

// Route to create update contact info
router.put(
  "/:id",
  validation.contactRules(),
  validation.validate,
  utilities.handleErrors(contactsController.updateContact)
);

// Route to delete contact
router.delete("/:id", utilities.handleErrors(contactsController.deleteContact));

module.exports = router;
