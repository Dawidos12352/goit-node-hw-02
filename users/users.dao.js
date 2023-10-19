const User = require("./user.model");
const { v4: uuid } = require('uuid');

const createUser = async (userData) => {
    try {
        return await User.create({
            ...userData,
            verified: false,
            verificationToken: uuid()
        });
    } catch (error ) {
        console.log("Error in creating user" , error , userData);
    }
}
const getUser = async (email) => {
    try {
      return await User.findOne({ email });
    } catch (error) {
      console.error(error.message);
    }
  };

const updateUser = async (email, userData) => {
    try {
        return await User.findOneAndUpdate({email}  , userData);
    }catch (error) {
        console.error(error.message)
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
}