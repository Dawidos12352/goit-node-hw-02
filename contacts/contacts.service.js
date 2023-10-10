const { Contact } = require("./contacts.model");

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.error(error.message);
  }
};
const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId)
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {

    return await Contact.findByIdAndRemove(contactId)
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  try {
    const newContact = new Contact(body);
    const updatedContact = await newContact.save()
    return updatedContact
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
      });
  } catch (error) {
    console.error(error.message);
    return null;
  }
};


const updateStatusContact = async (contactId, body) => {
  try {
    const { favorite } = body
    return await updateContact(contactId, { favorite })
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};