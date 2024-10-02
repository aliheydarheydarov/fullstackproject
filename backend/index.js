
const express= require("express");
const port =process.env.PORT || 3000;
//const xmlparser = require('express-xml-bodyparser');

const app=express();
const  cors = require("cors");
//const allowedOrigins = [''];
const jwt= require("jsonwebtoken");


//const corsOptions = {
 // origin: function (origin, callback) {
   // if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
     // callback(null, true);
   // } else {
     // callback(new Error('Not allowed by CORS'));
   // }
 // },
//};
require('./src/config/dbsql');
app.use(cors());


const User = require("./src/schema/users");
require('./src/config/db');
require('./src/config/dbsql');
const userRouter= require("./src/routes/userRoutes");
const productRouter=require("./src/routes/productRoutes");
const basketRouter=require("./src/routes/basketRoutes");

app.use(express.json());
//app.use(xmlparser());


  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.use("/users",userRouter);
app.use("/products",productRouter);
app.use("/baskets",basketRouter);




  app.listen(port, '104.248.136.206',  () => {
    console.log(`Example app listening on port ${port}`);
  });


