// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',            // host
  user: 'root',                 // username
  password: '1234',             // password
  database: 'roundcube',        // db_name 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
