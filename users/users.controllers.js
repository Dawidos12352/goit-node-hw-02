const User = require("./user.model");
const userDao = require("./users.dao");
const authService = require("../auth/auth.service")


const signupHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
          return res.status(409).json({ message: "Email in use" });
        }
        const newUser = await userDao.createUser({ email, password });
        return res.status(201).json({
          user: {
            email: newUser.email,
            subscription: newUser.subscription,
            message: "Registration successful",
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
  }
  module.exports = {
    signupHandler,
    loginHandler,
    logoutHandler,
    currentHandler,
  }