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
      return res.status(400).send({ error: "Incorrect password" });
    }

    // If email and password are correct, generate a token
    const token = jwt.sign({ id: user[0].user_id }, "jwtkey", { expiresIn: "1h" });

    // Exclude the password from the response
    const { password: userPassword, ...other } = user[0];

    // Set the token as an HTTP-only cookie
    res.cookie("access_token", token, { httpOnly: true });

    // Send a successful response with user information (excluding the password)
    res.status(200).send(other);
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {};

module.exports = { register, login, logout };
