const User = require("./user.model");
const userDao = require("./users.dao");
const authService = require("../auth/auth.service")

const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");
const mimetypes = require("mime-types");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");


const signupHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }
    const avatarURL = gravatar.url(email, { default: "identicon" }, true);
    const newUser = await userDao.createUser({ email, password, avatarURL });
    return res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        message: "Registration successful",
        avatar: newUser.avatarURL,
      },
    });
  } catch (error) {
    return next(error);
  }
};
  const loginHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userEntity = await userDao.getUser(email);
      if (!userEntity || !(await userEntity.validatePassword(password))) {
        return res.status(401).json({ message: "Email or password is wrong" });
      }
  
      const userPayload = {
        id: userEntity._id,
        email: userEntity.email,
        subscription: userEntity.subscription,
      };
  
      const token = authService.generateAccessToken(userPayload);
      await userDao.updateUser(userEntity.email, { token });
      return res.status(200).json({
        user: userPayload,
        token,
      });
    } catch (error) {
      return next(error);
    }
  };

  const logoutHandler = async (req , res , next) => {
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {token: ""});
        return res.status(204).json({message: "No content, logout success"})
    } catch (error) {
        return next(error)
    }
  }
  
  const currentHandler = async( req, res, next) => {
    try {
        const {email , subscription} = req.user;
        return res.status(200).json({user: {email, subscription}})
    }catch (error) {
        return next(error)
    }
  };

  const updateAvatarHandler = async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Missing avatar" });
      }
      const { _id } = req.user;
      console.log(req.file);
      const { path: tempUpload} = req.file;
      const avatarFileName = `${_id}_${Date.now()}.${mimetypes.extension(
        req.file.mimetype
      )}`;
      console.log(avatarFileName);
      const resultUpload = path.join(avatarsDir, avatarFileName);
      const avatarImage = await jimp.read(req.file.path);
      await avatarImage.resize(250, 250).writeAsync(req.file.path);
      await fs.rename(tempUpload, path.join(resultUpload));
      const avatarURL = `http://localhost:3000/avatars/${avatarFileName}`;
      await User.findByIdAndUpdate(_id, { avatarURL });
      return res.status(200).json({ avatarURL });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: "Not authorized",
        error: "An error occurred while updating the avatar",
      });
    }
  };
  

  module.exports = {
    signupHandler,
    loginHandler,
    logoutHandler,
    currentHandler,
    updateAvatarHandler,
  }