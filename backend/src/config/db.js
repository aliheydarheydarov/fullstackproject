const mongoose=require("mongoose");

mongoose
  .connect(
    `<mongodb_srv>`
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
