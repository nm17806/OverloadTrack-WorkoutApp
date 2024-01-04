const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const getExercises = async (req, res) => {
  try {
    // Retrieve user_id from local storage
    const user_id = req.user.id;

    const [result] = await pool.query(
      `
    SELECT * FROM exercise
    WHERE is_active = true
    AND (user_id = ?)`,
      [user_id]
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Not sure if this is needed
const getExercise = async (req, res) => {
  const id = req.params.exercise_id;

  try {
    const [result] = await pool.query(`SELECT * FROM Exercise WHERE exercise_id = ?`, [id]);
    res.status(200).send(result[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const createExercise = async (req, res) => {
  const { exercise_name, body_part } = req.body;
  const user_id = req.user.id;
  try {
    const [result] = await pool.query(
      `
  INSERT INTO exercise (exercise_name, body_part, user_id)
  VALUES (?,?,?)`,
      [exercise_name, body_part, user_id]
    );
    res.status(201).send({ id: result.insertId, exercise_name, body_part });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const disableExercise = async (req, res) => {
  const id = req.params.exercise_id;
  try {
    const [result] = await pool.query(`UPDATE exercise SET is_active = false WHERE exercise_id = ?`, [id]);
    res.status(200).send({ Deleted_Rows: result.affectedRows });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = { getExercises, getExercise, createExercise, disableExercise };
