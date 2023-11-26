const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

const getExercises = async () => {
  const [rows] = await pool.query("SELECT * FROM Exercise");
  return rows;
};

const fetchAndLogExercises = async () => {
  const exercises = await getExercises();
  console.log(exercises);
};

fetchAndLogExercises();
