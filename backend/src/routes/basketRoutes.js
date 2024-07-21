const express= require("express");
const basketController=require("./../controllers/basketController");
const verifyToken=require("./../middleware/userAuth");


const basketRouter=express.Router();


basketRouter.get("/", verifyToken.verifyToken, basketController.userBaskets);


basketRouter.post("/", basketController.addToBasket);
basketRouter.delete("/:user_id/:product_id", basketController.deleteFromBasket);

module.exports= basketRouter;