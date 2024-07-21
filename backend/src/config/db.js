const mongoose=require("mongoose");

mongoose
  .connect(
    `mongodb+srv://eliheyderheyderov1:asdasfamanas@cluster0.hbz8x4q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });