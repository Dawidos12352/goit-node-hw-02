const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(10)
    .required(),
});



router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch(error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  // const {id} = req.params;
  try {
    const contacts = await getContactById(req.params.id);
    if(contacts) {
      res.status(200).json(contacts);
    }
    return res.status(404).json({message : "TEST dalej"})
  } catch(error){
    next(error)
  }
})

router.post('/', async (req, res, next) => {

  try {
    const { error } = contactSchema.validate(req.body);
    if(error) {
      return res.status(400).json({message : error.details[0].message})
    }
    const { name, email, phone } =req.body; 
    const newContact = await addContact({name, email, phone});
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  const {contactId} = req.params.id;
  try {
    const deleted = await removeContact(contactId);
    if (deleted) {
      res.status(200).json({message: "Contact deleted"})
    } 
    res.status(404).json({message: "TEST"});
  } catch(error) {
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  const {contactId} = req.params.id;
  try {
    const { error } = contactSchema.validate(req.body);
    if(error) {
      return res.status(400).json({message : error.details[0].message});
    }
    const updatedContact = await updateContact(contactId, req.body);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    }
  res.status(404).json({message : "not found"});
  } catch (error) {
    next(error)
  }
})

module.exports = router
