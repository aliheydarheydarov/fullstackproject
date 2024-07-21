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
    isAdmin: { type: Boolean, default: false }
  });

const User= mongoose.model("User", userSchema);

module.exports=User;