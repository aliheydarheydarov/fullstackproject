const express= require("express");
const port =3000;
const app=express();
var cors = require("cors");
const jwt= require("jsonwebtoken");

const User = require("./src/schema/users");
require('./src/config/db');
require('./src/config/dbsql');
app.use(cors());
const userRouter= require("./src/routes/userRoutes");
const productRouter=require("./src/routes/productRoutes");
const basketRouter=require("./src/routes/basketRoutes");

app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.use("/users",userRouter);
app.use("/products",productRouter);
app.use("/baskets",basketRouter);




  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });


