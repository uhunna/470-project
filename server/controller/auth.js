const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../connect.js");

const register = (req, res) => {
  const selectQuery = "SELECT * FROM user WHERE username = ?";
  const insertQuery = "INSERT INTO user (username, name, email, password) VALUES (?, ?, ?, ?)";

  db.query(selectQuery, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const values = [
      req.body.username,
      req.body.name,
      req.body.email,
      hashedPassword,
    ];

    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Registration successful!");
    });
  });
};

const login = (req, res) => {
  const q = "SELECT * FROM user WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const sessionId = Math.random().toString(36).substring(2); // Generate a unique session ID
    const token = jwt.sign({ id: data[0].id, sessionId }, "secretkey");

    const { password, ...others } = data[0];

    res
   .cookie("accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  })
  .status(200)
  .json({ token, user: others }); // Token is also sent in JSON

  });
};


const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};

module.exports = { register, login, logout };