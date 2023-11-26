const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const fetchAndLogExercises = async () => {
  const [rows] = await pool.query("SELECT * FROM Exercise");
  console.log(rows);
  return rows;
};

fetchAndLogExercises();
