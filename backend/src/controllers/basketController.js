const mysql=require("mysql2");
const connection= require("./../config/dbsql")




const userBaskets = async (req, res) => {
  const user_id= req.userId;

  const sql = `SELECT * FROM baskets where user_id= ? `;

  // Sorğunu icra etmək
  connection.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("Sorğu icra olunarkən səhv: " + err.stack);
      res.status(500).send("Server səhvi baş verdi");
      return;
    }
    // Sorğu uğurla icra olundu, nəticələri göndər
    res.status(200).json(results);
  });
  };

  const addToBasket= async (req, res) =>{
    const { user_id , product_id , quantity } = req.body; 

  // Insert the new student into the database
  connection.query('INSERT INTO baskets (user_id, product_id, quantity) VALUES (?, ?, ?)', [user_id, product_id, quantity], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error inserting product');
      return;
    }
    res.status(201).send('Added to basket successfully');
})
};


const deleteFromBasket = async (req, res) => {
    const { user_id, product_id } = req.params;
  
    const sql = `DELETE FROM baskets WHERE user_id = ? AND product_id = ?`;
  
    // Execute the query
    connection.query(sql, [user_id, product_id], (err, results) => {
      if (err) {
        console.error("Error executing query: " + err.stack);
        res.status(500).send("Server error occurred");
        return;
      }
  
      if (results.affectedRows === 0) {
        res.status(404).send("No matching record found");
        return;
      }
  
      // Query executed successfully, send the results
      res.status(200).json({ message: "Product removed from basket successfully" });
    });
  };

module.exports= {
    userBaskets,
    deleteFromBasket,
    addToBasket,
}