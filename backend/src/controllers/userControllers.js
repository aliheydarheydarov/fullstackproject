const { v4: uuidv4 } = require("uuid");
const User=require("./../schema/users.js");
var jwt = require("jsonwebtoken");
require("dotenv").config();



const getAllUser = async (req, res) => {
    const data = await User.find();
    res.status(200).send(data);
  };


// const addUser= async (req, res) =>{
//     let obj= req.body;
//     obj.id= uuidv4();
//     const user= await new User({...obj});
//     await user.save();
//     const data=await User.find();
//     res.status(200).send({ message: "success", data: data});
// }

const getUserById = async (req, res) => {
    const { id } = req.params;
  
    const user = await User.findOne({ id: id });
  
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({
        status: 404,
        message: " bele bir user yoxdur",
      });
    }
  };

  const deleteUserById = async (req, res) => {
    const { id } = req.params;
  
    if (await User.findOneAndDelete({ id: id })){
  
    res.status(200).send("deleted");
  }
    else{
      
      res.status(404).send("user not found");}

    
  };

  const deleteUserByUsername = async (req, res) => {
    const { username } = req.params;
  
    if (await User.findOneAndDelete({ username: username })){
  
    res.status(200).send("deleted");
  }
    else{
      
      res.status(404).send("user not found");}

    
  };

  const patchUser = async (req, res) => {
    try {
        const { username } = req.body; // Assuming username is provided in the request body
        if (!username) {
            return res.status(400).send({ message: "Username is required" });
        }

        const updatedUser = await User.findOneAndUpdate({ username }, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ message: "success", data: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error", error: error.message });
    }
};

module.exports = patchUser;

  
  const loginUser = async (req, res) => {
    const obj = req.body;
    const user = await User.findOne({ username: obj.username, password: obj.password });

    if (user){
      const accessToken= jwt.sign({"user.id": user.id, "isAdmin": user.isAdmin}, process.env.ACCESS_TOKEN, {
        expiresIn: "7d",
    })
         res.status(200).json({accessToken});
    }
    else{
        res.status(400).send({
            message: "İstifadəçi adı və ya şifrə yanlışdır."
        });
    }
  };

  const registerUser = async (req, res) => {
    try {
      const obj = req.body;
      const existingUsername = await User.findOne({ username: obj.username });
      const existingEmail = await User.findOne({ email: obj.email });

      if (existingUsername ) {
        return res.status(400).json({ error: "Username already exists" });
      }
      if (existingEmail ) {
        return res.status(401).json({ error: "This email is already used" });
      }
      obj.id = uuidv4();
      // Create a new user instance
      const user = new User({ ...obj });
      // Save the user to the database
      await user.save();
      res.status(200).json({ message: "Registration successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


module.exports={
    getAllUser,
    //addUser,
    getUserById,
    deleteUserById,
    patchUser,
    loginUser,
    registerUser,
    deleteUserByUsername,
  
}