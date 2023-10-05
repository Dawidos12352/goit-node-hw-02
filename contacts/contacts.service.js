const {Contact} = require("./contacts.model")

const listContacts = async () => {
  try {
   return await Contact.find();
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return contact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const removeContact = async (id) => {
  try {
    await Contact.findByIdAndDelete(id)
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const newContact = new Contact(body);
    const saveContact = await newContact.save();
    return saveContact;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const updateContact = async (id, body) => {

  try {
    const updateContact = await Contact.findByIdAndUpdate(id, body, {
      new: true
    });
    return updateContact;
  } catch(error) {
    console.log(error.message)
    return null;
  }
};

const updateContactStatus = async (id, body) => {
  try{
    const {favorite} = body;
    if(!favorite) {
      console.log("You haven`t favorite contacts")
    }
    const data = await Contact.findByIdAndUpdate(
      {_id : id},
      {favorite : favorite},
      {new : true}
    );
    console.log(data);
    if (data === null) {
      return "Contact not found";
    }
    return data;
  } catch (error){
    console.error(error.message)
    return null;
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};