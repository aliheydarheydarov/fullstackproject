const express= require("express");
const productController=require("./../controllers/productControllers.js");
const userAuth = require("./../middleware/userAuth.js");

const productRouter=express.Router();


productRouter.get("/",productController.getAllProducts);


productRouter.post("/", userAuth.checkAdmin, productController.registerProduct);
productRouter.get("/:id", productController.getProductById);

module.exports= productRouter;
