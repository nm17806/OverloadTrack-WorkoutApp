const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Grabs the workout session date and the workout name
const getSessions = async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT
    uwr.record_id,
    wt.template_name,
    uwr.workout_date
    FROM User_Workout_Record as uwr
    JOIN workout_template as wt on uwr.template_id = wt.template_id`);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// This grabs a table of showing the Workout Name and the sets performed for each exercise in the workout
const getSession = async (req, res) => {
  const id = req.params.record_id;
  try {
    const [result] = await pool.query(
      `SELECT
        uwr.record_id,  
        uws.set_id,
        wtr.template_name,
        uwr.workout_date,
        e.exercise_name,
        e.body_part,
        uws.weight,
        uws.reps
    FROM User_Workout_Set AS uws
    JOIN Exercise AS e ON uws.exercise_id = e.exercise_id
    JOIN User_Workout_Record AS uwr ON uws.record_id = uwr.record_id
    JOIN Workout_Template AS wtr ON uwr.template_id = wtr.template_id
    WHERE  uwr.record_id = ?`,
      [id]
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = { getSessions, getSession };
