const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'projectuser',
  password: 'Salam123',
  database: 'ecommerce'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports=connection;
