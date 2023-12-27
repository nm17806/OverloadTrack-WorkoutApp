const mysql = require("mysql2/promise");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const register = async (req, res) => {
  // Check if user exists
  const { email, password } = req.body;
  const [checkForUser] = await pool.query(`SELECT * FROM user_auth WHERE email = ?`, [email]);

  if (checkForUser.length > 0) {
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
  // Check if user exists
  const { email, password } = req.body;
  const [checkForUser] = await pool.query(`SELECT * FROM user_auth WHERE email = ?`, [email]);
  if (!checkForUser.length > 0) {
    res.status(400).send({ error: "There is no account associated with this email address" });
  } else {
    try {
      // Check password
      const passwordMatch = bcrypt.compareSync(password, checkForUser[0].password);
      const token = jwt.sign({ id: checkForUser[0].user_id }, "jwtkey", { expiresIn: "1h" });
      if (passwordMatch) {
        res.status(200).send({ id: checkForUser[0].user_id, email });
      } else {
        res.status(400).send({ error: "Incorrect password" });
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
};

const logout = async (req, res) => {};

module.exports = { register, login, logout };
