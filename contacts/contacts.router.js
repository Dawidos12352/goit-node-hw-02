const express = require("express");
const router = express.Router();
const contactValidationMiddleware = require("./contacts.validator");

const contactsController = require("./contacts.controllers");

router.get("/", contactsController.listContactsHandler);
router.get("/:contactId", contactsController.getContactByIdHandler);
router.post(
  "/",
  contactValidationMiddleware,
  contactsController.addContactHandler
);
router.delete("/:contactId", contactsController.removeContactHandler);
router.put(
    "/:contactId",
  contactValidationMiddleware,
  contactsController.updateContactHandler
);
router.patch("/:contactId/favorite", contactsController.updateStatusContactHandler);

module.exports = router;