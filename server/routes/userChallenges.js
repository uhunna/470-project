const express = require("express");
const router = express.Router();
const { db } = require("../connect.js");

// POST endpoint to accept a challenge
router.post("/", (req, res) => {
  const { cha_user_id, challenge_id } = req.body;

  if (!cha_user_id || !challenge_id) {
    return res.status(400).json({ error: "cha_user_id and challenge_id are required." });
  }

  const point = 0;

  const insertQuery = `
    INSERT INTO user_challenges (cha_user_id, challenge_id, point) 
    VALUES (?, ?, ?)
  `;

  console.log(`Inserting challenge acceptance: cha_user_id=${cha_user_id}, challenge_id=${challenge_id}`);

  db.query(insertQuery, [cha_user_id, challenge_id, point], (err, result) => {
    if (err) {
      console.error("Error inserting challenge acceptance:", err);
      return res.status(500).json({ error: "Error accepting challenge." });
    }

    console.log("Challenge accepted successfully:", result);

    res.status(200).json({
      message: "Challenge accepted successfully!",
      cha_user_id,
      challenge_id,
      point,
    });
  });
});

// GET challenges accepted by a specific user
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT uc.*, c.name AS challenge_name, c.description AS challenge_description
    FROM user_challenges uc
    JOIN challenge c ON uc.challenge_id = c.id
    WHERE uc.cha_user_id = ?
  `;

  db.query(query, [userId], (err, data) => {
    if (err) {
      console.error("Error fetching user challenges:", err);
      return res.status(500).json({ error: "Error fetching user challenges." });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "No accepted challenges found for this user." });
    }

    res.status(200).json(data);
  });
});

module.exports = router;
