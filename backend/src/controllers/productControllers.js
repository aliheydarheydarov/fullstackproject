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

  // Insert the new student into the database
  connection.query('INSERT INTO products ( image, title, price, description) VALUES ( ?, ?, ?, ?)', [ image, title, price, description], (err, results) => {
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



module.exports={
    getAllProducts,
    getProductById,
    registerProduct,
}