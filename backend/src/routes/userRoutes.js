const express=require("express");

const userController=require("./../controllers/userControllers.js");

const userRouter=express.Router();

const userAuth = require("./../middleware/userAuth.js");

//userRouter.get("/", userAuth, userController.getAllUser);

userRouter.get("/",userController.getAllUser);


userRouter.post("/", userController.addUser);
userRouter.get("/:id", userController.getUserById);
userRouter.delete("/:id", userController.deleteUserById);
userRouter.patch("/:id", userController.patchUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/register", userController.registerUser);
userRouter.post("/verifytoken", userAuth.verifyToken2);







module.exports= userRouter;
