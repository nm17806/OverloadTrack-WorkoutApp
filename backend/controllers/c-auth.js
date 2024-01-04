const mysql = require("mysql2/promise");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const register = async (req, res) => {
  // Check if user exists
  const { email, password } = req.body;
  const [User] = await pool.query(`SELECT * FROM user_auth WHERE email = ?`, [email]);

  if (User.length > 0) {
    res.status(400).send({ error: "There is already an account associated with this email address" });
  } else {
    try {
      // Create user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const [result] = await pool.query(`INSERT INTO user_auth (email, password) VALUES (?,?)`, [email, hash]);
      const id = result.insertId;
      const [newUserExercises] = await pool.query(
        `
      INSERT INTO exercise (exercise_name, body_part, is_active, user_id) VALUES 
      ('Bench press', 'Chest', '1', ?),
      ('Bench Fly', 'Chest', '1', ?),
      ('Lateral Row', 'Back', '1', ?),
      ('Pull Ups', 'Back', '1', ?),
      ('Squat', 'Quads', '1', ?),
      ('RDLs', 'Hamstrings', '1', ?),
      ('Leg Extensions', 'Quads', '1', ?),
      ('Leg Curls', 'Hamstrings', '1', ?),
      ('Dumbbell Shoulder Press', 'Shoulders', '1', ?),
      ('Lateral Pulldown', 'Back', '1', ?),
      ('Bicep Curl', 'Biceps', '1', ?),
      ('Incline Bench Press', 'Chest', '1', ?),
      ('Cable Rear Delt fly', 'Rear Delts', '1', ?),
      ('Dumbell Lateral Raises', 'Shoulders', '1', ?),
      ('Walking Lunges', 'Quads', '1', ?),
      ('Cable Overhead Pull', 'Triceps', '1', ?),
      ('Face Pull', 'Back', '1', ?),
      ('Weighted crunch (cable)', 'Abdominals', '1', ?),
      ('Hanging Leg Raise', 'Abdominals', '1', ?)
      `,
        [id, id, id, id, id, id, id, id, id, id, id, id, id, id, id, id, id, id, id]
      );
      const [newUserWorkouts] = await pool.query(
        `INSERT INTO workout_template (template_name, is_active, user_id) VALUES
      ('Upper Body', '1', ?),
      ('Lower Body', '1', ?)
      `,
        [id, id]
      );
      console.log(newUserExercises);
      const exerciseId = newUserExercises.insertId;
      const workoutsId = newUserWorkouts.insertId;
      const [addExercisesToWorkouts] = await pool.query(
        `
      INSERT INTO workout_template_exercise (template_id, exercise_id, is_active, user_id) VALUES
      (?, ?, '1', ?),
      (?, ?, '1', ?),
    (?, ?, '1', ?),
    (?, ?, '1', ?),
    (?, ?, '1', ?),
    (?, ?, '1', ?),
    (?, ?, '1', ?),
    (?, ?, '1', ?),
    (?, ?, '1', ?),
    (?, ?, '1', ?),
    (?, ?, '1', ?),
    (?, ?, '1', ?),
    (?, ?, '1', ?)
 
      `,
        [
          workoutsId,
          exerciseId,
          id,
          workoutsId,
          exerciseId + 1,
          id,
          workoutsId,
          exerciseId + 2,
          id,
          workoutsId,
          exerciseId + 9,
          id,
          workoutsId,
          exerciseId + 8,
          id,
          workoutsId,
          exerciseId + 13,
          id,
          workoutsId,
          exerciseId + 10,
          id,
          workoutsId,
          exerciseId + 15,
          id,
          workoutsId + 1,
          exerciseId + 4,
          id,
          workoutsId + 1,
          exerciseId + 5,
          id,
          workoutsId + 1,
          exerciseId + 6,
          id,
          workoutsId + 1,
          exerciseId + 7,
          id,
          workoutsId + 1,
          exerciseId + 14,
          id,
        ]
      );
      res.status(201).send({ id: result.insertId, email });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
};

const login = async (req, res) => {
  try {
    // Check if user exists
    const { email, password } = req.body;
    const [user] = await pool.query(`SELECT * FROM user_auth WHERE email = ?`, [email]);

    if (!user.length > 0) {
      return res.status(404).send({ error: "There is no account associated with this email address" });
    }

    // Check password
    const passwordMatch = bcrypt.compareSync(password, user[0].password);

    if (!passwordMatch) {
      return res.status(400).send({ error: "Incorrect password", secure: true });
    }

    // If email and password are correct, generate a token
    const token = jwt.sign({ id: user[0].user_id }, process.env.SECRET, { expiresIn: "3d" });
    console.log(token);

    // Exclude the password from the response
    const { password: userPassword, ...other } = user[0];

    const data = { ...other, token: token };

    // Send a successful response with user information (excluding the password)
    res.status(200).send(data);
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  res.status(200).send({ message: "Logged out" });
};

module.exports = { register, login, logout };
