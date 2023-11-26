const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const getWorkouts = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Workout_Template WHERE is_active = true;");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getWorkout = async (req, res) => {
  const id = req.params.template_id;
  try {
    const [result] = await pool.query(
      // This shows what exercises have been added to which workout templates
      `
        SELECT
      WT.template_name AS Workout_Template_Name,
      E.exercise_name AS Exercise_Name,
      E.body_part AS BodyPart
        FROM Workout_Template_Exercise AS WTE
        JOIN Workout_Template AS WT ON WTE.template_id = WT.template_id
        JOIN Exercise AS E ON WTE.exercise_id = E.exercise_id
        WHERE WTE.template_id = ?`,
      [id]
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const disableWorkout = async (req, res) => {
  const id = req.params.template_id;
  const [result] = await pool.query(`UPDATE Workout_Template SET is_active = false WHERE template_id = ?`, [id]);

  try {
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = { getWorkouts, getWorkout, disableWorkout };