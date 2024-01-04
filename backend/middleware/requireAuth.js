const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const secretKey = process.env.SECRET;

  if (!token) return res.status(401).json({ error: "Not Authenticated!" });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token is not Valid" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
