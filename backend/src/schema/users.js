const mongoose= require("mongoose");

// const userSchema= new mongoose.Schema({
//     username: String,
//     password: String,
//     id: String,
// });

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  id: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  email: { type: String, unique: true, required: true, default: "example@mail.com" },
  name: { type: String, default: "user", required: true },
  surname: { type: String, default: "user", required: true }
});

const User= mongoose.model("User", userSchema);

module.exports=User;