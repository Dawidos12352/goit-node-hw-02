const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const list = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(list));
    return JSON.parse(list);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const list = await listContacts();
    const contact = list.find(({ id }) => id === contactId);
    console.log(contact);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const list = await listContacts();
    const filteredList = list.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredList, null, 2));
    console.log("Contact is deleted!")
    return filteredList;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const list = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    list.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(list), "utf-8");
    console.log("New contact added",newContact.name);
    return list;
  } catch (error) {
    console.log(error.message);
  }
};

async function updateContact(contactId, body) {

  try {
    const list = await listContacts();
    const updatedContactIndex = await list.findIndex((event) => event.id === contactId);
    const updatingContact = list[updatedContactIndex];
    if (body.name) updatingContact.name = body.name;
    if (body.email) updatingContact.email = body.email;
    if (body.phone) updatingContact.phone = body.phone;
    await fs.writeFile(contactsPath, JSON.stringify(list), "utf-8");
    console.log("Contact updated",updatingContact.name);
    return updatingContact;
  } catch(error) {
    console.log(error.message)
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};