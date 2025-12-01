// const mysql = require('mysql2');
// const connection = mysql.createConnection({
//   host: 'localhost', 
//   user: 'projectuser',
//   password: 'Salam123',
//   database: 'ecommerce'
// });
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'aivencloud', 
  user: 'username',
  password: 'password',
  database: 'db',
  port: 21678,
});

const createTableProducts = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      image VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      price INT NOT NULL,
      description VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error creating table: ', err);
      return;
    }
    console.log('Table created: ', results);
  });
};

const createTableBaskets = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS baskets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL
    )
  `;
  

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error creating table: ', err);
      return;
    }
    console.log('Table created: ', results);
  });
};


createTableProducts();

createTableBaskets();
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports=connection;
