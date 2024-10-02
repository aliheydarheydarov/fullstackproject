
const mysql=require("mysql2");
const connection= require("./../config/dbsql")
const libxmljs = require('libxmljs');
const fs = require('fs');



const userBaskets = async (req, res) => {
  const {user_id}= req.params;

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

//   const addToBasket= async (req, res) =>{
//     const { user_id , product_id , quantity } = req.body; 

//   // Insert the new student into the database
//   connection.query('INSERT INTO baskets (user_id, product_id, quantity) VALUES (?, ?, ?)', [user_id, product_id, quantity], (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).send('Error inserting product:', err);
//       return;
//     }
//     res.status(201).send('Added to basket successfully');
// })
// };





const addToBasket = (req, res) => {
  let xmlData = '';

  // Listen for data chunks
  req.on('data', chunk => {
    xmlData += chunk; // Accumulate data chunks
  });

  req.on('end', () => {
    try {
      // Parse the XML using libxmljs and allow external entities
      const xmlDoc = libxmljs.parseXml(xmlData, { noent: true });

      // Extract data from the parsed XML body
      const user_id = xmlDoc.get('//user_id').text();
      const product_id = xmlDoc.get('//product_id').text();

      // SQL query to insert or update the quantity
      const sql = `
        INSERT INTO baskets (user_id, product_id, quantity)
        VALUES (?, ?, 1)
        ON DUPLICATE KEY UPDATE quantity = quantity + 1
      `;

      // Execute the query
      connection.query(sql, [user_id, product_id], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
//          res.status(500).send('Error inserting/updating product in basket:', err);
		res.status(500).send({error: err, stack: err.stack});
          return;
        }
        res.status(201).send('Added to basket successfully');
      });
    } catch (err) {
      console.error('XML parsing error:', err);
      return res.status(400).send('Invalid XML');
    }
  });
};

const updateBasket = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  // SQL query to update the quantity
  const sql = `
    UPDATE baskets
    SET quantity = ?
    WHERE user_id = ? AND product_id = ?;
  `;

  // Execute the query
  connection.query(sql, [quantity, user_id, product_id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error updating product in basket');
      return;
    }

    // Check if any rows were affected
    if (results.affectedRows === 0) {
      res.status(404).send('Product not found in basket');
    } else {
      res.status(200).send('Updated basket successfully');
    }
  });
};




const deleteFromBasket = async (req, res) => {
  const { user_id, product_id } = req.params;

  if (!user_id || !product_id) {
    return res.status(400).send("User ID and Product ID are required");
  }

  const sql = `DELETE FROM baskets WHERE user_id = ? AND product_id = ?`;

  // Execute the query
  connection.query(sql, [user_id, product_id], (err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).send("Server error occurred");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("No matching record found");
    }

    // Query executed successfully, send the results
    res.status(200).json({ message: "Product removed from basket successfully" });
  });
};


module.exports= {
    userBaskets,
    deleteFromBasket,
    addToBasket,
    updateBasket
}
