const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const getWorkoutsandExercises = async (req, res) => {
  // This shows what exercises have been added to which workout templates
  try {
    const [result] = await pool.query(`
    SELECT
    WTE.id,
    WT.template_id AS template_id,
    E.exercise_id AS exercise_id,
    WT.template_name AS workout_template_name,
    E.exercise_name AS exercise_name,
    E.body_part AS body_part
    FROM Workout_Template_Exercise AS WTE
    JOIN Workout_Template AS WT ON WTE.template_id = WT.template_id
    JOIN Exercise AS E ON WTE.exercise_id = E.exercise_id
    WHERE WTE.is_active = true;
      `);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getWorkouts = async (req, res) => {
  const id = req.params.template_id;
  try {
    const [result] = await pool.query(
      `
      SELECT * FROM workout_template WHERE is_active = true
      `
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const disableWorkout = async (req, res) => {
  const id = req.params.template_id;
  try {
    const [result] = await pool.query(`UPDATE Workout_Template SET is_active = false WHERE template_id = ?`, [id]);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const addWorkout = async (req, res) => {
  const { template_name } = req.body;
  try {
    const [result] = await pool.query(
      `
  INSERT INTO workout_template (template_name)
  VALUES (?);`,
      [template_name]
    );
    res.status(201).send({ id: result.insertId, template_name });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const addExercisesToWorkout = async (req, res) => {
  const { template_id, exercise_id } = req.body;
  try {
    const [result] = await pool.query(
      `
      INSERT INTO Workout_Template_Exercise (template_id, exercise_id)
      VALUES (?,?);
      `,
      [template_id, exercise_id]
    );
    res.status(201).send({ mssg: "Exercise added to workout template successfully." });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const removeExerciseFromWorkout = async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await pool.query(
      `
      UPDATE workout_template_exercise
      SET is_active = false
      WHERE id = ?;
      `,
      [id]
    );
    res.status(200).send({ mssg: "Exercise removed from workout successfully." });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getWorkoutsandExercises,
  getWorkouts,
  disableWorkout,
  addWorkout,
  addExercisesToWorkout,
  removeExerciseFromWorkout,
};
