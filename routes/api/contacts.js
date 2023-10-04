const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
   addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const { contactValidator } = require("../../utils/validator");

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await listContacts());
  } catch (error) {
    next(error)
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    contact ? res.status(200).json(contact) : res.status(404).json({message : "Not found"})
  } catch (error) {
    next(error)
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactValidator(req.body);
    if (error) return res.status(400).json({message : error.details[0].message});
    res.status(201).json(await addContact(req.body));
  } catch (error) {
    next(error)
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    contact
      ? res.status(200).json({ message: "Contact deleted" })
      : res.status(404).json({message : "Not found"})
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = contactValidator(req.body);
    if (error) return res.status(400).json({message : error.details[0].message});
    const savedContact = await updateContact(contactId, req.body);
    if (savedContact) res.status(200).json({ updated: savedContact });
    if (!savedContact) res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;