const { db } = require("../connect.js");

const getLeaderboard = (req, res) => {
  const query = 
    'SELECT u.id, u.username, u.name, SUM(uc.point) AS total_points'
    'FROM user_challenges uc'
    'JOIN user u ON uc.cha_user_id = u.id'
   ' GROUP BY u.id'
    'ORDER BY total_points DESC'
    'LIMIT 10; -- Fetch top 10 users'
  ;

  db.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching leaderboard:", err);
      return res.status(500).json({ error: "Error fetching leaderboard." });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "No data available for leaderboard." });
    }

    res.status(200).json(data);
  });
};

module.exports = { getLeaderboard };