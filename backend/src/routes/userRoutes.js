const express=require("express");

const userController=require("./../controllers/userControllers.js");

const userRouter=express.Router();

const userAuth = require("./../middleware/userAuth.js");

//userRouter.get("/", userController.getAllUser);

//userRouter.get("/", userAuth.verifyToken, userController.getAllUser);
userRouter.get("/", userAuth.checkAdmin, userController.getAllUser);


//userRouter.post("/", userController.addUser);
userRouter.get("/:id",  userController.getUserById);
userRouter.delete("/:id", userAuth.checkAdmin, userController.deleteUserById);
userRouter.delete("/username/:username",userAuth.checkAdmin , userController.deleteUserByUsername);

userRouter.patch("/",userAuth.checkAdmin,  userController.patchUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/register", userController.registerUser);
userRouter.post("/verifytoken", userAuth.verifyToken2);







module.exports= userRouter;
