const express= require("express");
const productController=require("./../controllers/productControllers.js");

const productRouter=express.Router();


productRouter.get("/",productController.getAllProducts);


productRouter.post("/", productController.registerProduct);
productRouter.get("/:id", productController.getProductById);

module.exports= productRouter;