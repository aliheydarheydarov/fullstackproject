const { v4: uuidv4 } = require("uuid");
const mysql=require("mysql2");
const connection= require("./../config/dbsql")


const getAllProducts = async (req, res) => {
    const sql = "SELECT * FROM products";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Sorğu icra olunarkən səhv: " + err.stack);
      res.status(500).send("Server səhvi baş verdi");
      return;
    }
    res.status(200).json(results);
  });

};

const registerProduct= async (req, res) =>{
    const { image , title, price, description } = req.body; 
    const id = uuidv4();

  // Insert the new student into the database
  connection.query('INSERT INTO products (id, image, title, price, description) VALUES (?, ?, ?, ?, ?)', [id, image, title, price, description], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error inserting product');
      return;
    }
    res.status(201).send('Student added successfully');
})
};

const getProductById = async (req, res) => {
    const { id } = req.params;

  const sql = `SELECT * FROM products where id= ?`;

  // Sorğunu icra etmək
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Sorğu icra olunarkən səhv: " + err.stack);
      res.status(500).send("Server səhvi baş verdi");
      return;
    }
    // Sorğu uğurla icra olundu, nəticələri göndər
    res.status(200).json(results);
  });
  };

  const deleteProductById = async (req, res) => {
    const { id } = req.params;

  const sql = `DELETE FROM products where id= ?`;

  // Sorğunu icra etmək
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Sorğu icra olunarkən səhv: " + err.stack);
      res.status(500).send("Server səhvi baş verdi");
      return;
    }
    // Sorğu uğurla icra olundu, nəticələri göndər
    res.status(200).json(results);
  });
  };









//   const deleteUserById = async (req, res) => {
//     const { id } = req.params;
  
//     if (await User.findOneAndDelete({ id: id })){
  
//     res.status(200).send("deleted");
//   }
//     else{
      
//       res.status(404).send("user not found");}

    
//   };

//   const patchUser = async (req, res) => {
//     const { id } = req.params;
//     let obj = req.body;
  
//     let user = await User.findOneAndUpdate({ id: id }, { ...obj });
  
//     res.status(200).send({ message: "success", data: user });
//   };
  
//   const loginUser = async (req, res) => {
//     const obj = req.body;
//     const user = await User.findOne({ username: obj.username, password: obj.password });

//     if (user){
//       const accessToken= jwt.sign({"user.id": user.id}, process.env.ACCESS_TOKEN, {
//         expiresIn: "14d",
//     })
//          res.status(200).json({accessToken});
//     }
//     else{
//         res.status(400).send({
//             message: "İstifadəçi adı və ya şifrə yanlışdır."
//         });
//     }
//   };

//   const registerUser = async (req, res) => {
//     try {
//       const obj = req.body;
//       const existingUser = await User.findOne({ username: obj.username });
//       if (existingUser) {
//         return res.status(400).json({ error: "Username already exists" });
//       }
//       obj.id = uuidv4();
//       // Create a new user instance
//       const user = new User({ ...obj });
//       // Save the user to the database
//       await user.save();
//       res.status(200).json({ message: "Registration successful" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   };


module.exports={
    getAllProducts,
    getProductById,
    registerProduct,
}