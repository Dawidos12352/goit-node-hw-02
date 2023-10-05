const { listContacts, getContactById, removeContact, addContact, updateContact, updateContactStatus} = require("./contacts.service");

const listContactsHandler = async (req, res) => {
    try {
        const list = await listContacts();
        console.log(list);
        return res.status(200).json(list);
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Server error!"});
    }
}

const getContactByIdHandler = async (req, res) => {
    try {
        const contact = await getContactById(req.params.id);
        if (!contact) {
            return res.status(404).json({message : "Not found"})
        }
        return res.status(200).json(contact);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Server error!"});
    }
}


const removeContactHandler = async (req, res) => {
    try {
        const removedContact = await removeContact(req.params.id);
        if (removedContact) {
            return res.status(404).json({message : "Not found"})
        }
        return res.status(200).json({message : "Contact deleted"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Server error!"});
    }
}


const addContactHandler = async (req, res) => {
    try {
      const newContact = await addContact(req.body);
      if (!newContact) {
        return res.status(400).json({ message: "Missing require fields" });
      }
      return res.status(201).send(newContact);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Server error!"});
    }
  };



const updateContactHandler = async (req, res) => {

    try {
        const updatedContact = await updateContact(req.params.id , req.body);
        if (!updatedContact) {
            return res.status(400).json({message : "Missing fields"})
        }
        return res.status(200).json(updatedContact);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Server error!"});
    }
}


const updateStatusContactHandler = async (req, res) => {
    const {favorite} = req.body;
    if (favorite === null) {
        return res.status(400).json({message : "Missing field favorite"})
    }
    try {
        const updatedStatus = await updateContactStatus(req.params.id , req.body);
        if (!updatedStatus) {
            return res.status(404).json({message : "Not found"})
        }
        return res.status(200).json(updatedStatus);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Server error!"});
    }
}

module.exports = { listContactsHandler, getContactByIdHandler, removeContactHandler, addContactHandler, updateContactHandler, updateStatusContactHandler}