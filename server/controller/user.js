const { db } = require("../connect.js");

const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM user WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

const getAllUsers = (req, res) => {
  const q = "SELECT id, username, name, email FROM user";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("No users found!");
    return res.status(200).json(data);
  });
};


module.exports = { getUser, getAllUsers };