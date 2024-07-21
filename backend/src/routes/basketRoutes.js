const express= require("express");
const basketController=require("./../controllers/basketController");
const verifyToken=require("./../middleware/userAuth");


const basketRouter=express.Router();


basketRouter.get("/:user_id", basketController.userBaskets);


basketRouter.post("/", basketController.addToBasket);
basketRouter.delete("/:user_id/:product_id", basketController.deleteFromBasket);
basketRouter.patch("/update", basketController.updateBasket);

module.exports= basketRouter;