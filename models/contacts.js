const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");


async function listContacts() {
  try {
    const list = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(list));
    return JSON.parse(list);
  } catch (error) {
    console.log(error)
  }
};

async function getContactById(contactId) {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const contact = list.find(event => event.id === contactId);
    console.log(contact);
  } catch(error) {
    console.log(error);
  }
};

async function removeContact(contactId) {
  try {
    let list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const contactIndex = list.findIndex((event) => event.id === contactId);
    if (contactIndex === -1) {
      console.log("Contact not found");
      return;
    }
    const contactName = list[contactIndex].name;
    list = list.filter((event) => event.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(list), "utf-8");
    console.log(`Contact ${contactName} with id ${contactId} removed`);
    return list;

  } catch(error) {
    console.log(error);
  }
};

async function addContact(name, email, phone) {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const newContact = {
      id: new Date(),
      name,
      email,
      phone,
    };
    list.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(list), "utf-8");

    console.log("New contact added",newContact.name);
    return list;

  } catch(error) {
    console.log(error)
  }
};
async function updateContact(contactId, body) {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const contactIndex = list.findIndex((event) => event.id === contactId);
    if (contactIndex === -1) {
      list[contactIndex] = { ...list[contactIndex],  ...body};
      await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
      return list[contactIndex]
    }
    return null
  } catch(error) {
    console.log(error)
  }
};

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
  }