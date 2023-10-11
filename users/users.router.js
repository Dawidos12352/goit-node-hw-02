const { Router } = require('express');
const usersController = require("./users.controllers");
const { userValidateMiddleware } = require("./users.validator");
const { authMiddleware } = require("../auth/auth.middleware");

const usersRouter = Router();

usersRouter.post("/signup", userValidateMiddleware,  usersController.signupHandler);
usersRouter.post("/login", userValidateMiddleware,  usersController.loginHandler);
usersRouter.get("/secret", authMiddleware,  (req, res) => 
res.status(200).json({message: "Hello from secret area!"}));
usersRouter.get("/logout", authMiddleware, usersController.logoutHandler);
usersRouter.get("/current", authMiddleware, usersController.currentHandler);

module.exports = usersRouter;