const { db } = require("../connect.js");

const getUserChallenges = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM user_challenges WHERE cha_user_id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("No accepted challenges found!");
    return res.status(200).json(data);
  });
};

module.exports = { getUserChallenges };
