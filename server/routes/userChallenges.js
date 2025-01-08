const express = require("express");
const router = express.Router();
const { db } = require("../connect.js");

// POST endpoint to accept a challenge
// POST endpoint to accept a challenge
// POST endpoint to accept a challenge
router.post("/", (req, res) => {
  const { cha_user_id, challenge_id } = req.body;

  // Check if required fields are present
  if (!cha_user_id || !challenge_id) {
    return res.status(400).json({ error: "cha_user_id and challenge_id are required" });
  }

  const point = 0; // Initialize points to 0

  const insertQuery = `
    INSERT INTO user_challenges (cha_user_id, challenge_id, point) 
    VALUES (?, ?, ?)
  `;

  // Log the data being inserted
  console.log(`Inserting challenge acceptance with cha_user_id: ${cha_user_id}, challenge_id: ${challenge_id}, point: ${point}`);

  db.query(insertQuery, [cha_user_id, challenge_id, point], (err, result) => {
    if (err) {
      console.error("Error inserting challenge acceptance:", err);  // Log the error for more context
      return res.status(500).json({ error: "Error accepting challenge." });
    }

    console.log("Challenge accepted successfully:", result);  // Log the result of the insertion

    res.status(200).json({
      message: "Challenge accepted successfully!",
      cha_user_id,
      challenge_id,
      point,
    });
  });
});

// New API Endpoint to Increment Points
router.post("/increment-points", (req, res) => {
  const { challenge_id } = req.body;

  const incrementPointsQuery = `
    UPDATE user_challenges SET point = point + 10
    WHERE challenge_id = ?;
  `;

  db.query(incrementPointsQuery, [challenge_id], (err, result) => {
    if (err) {
      console.error("Error incrementing points:", err);
      return res.status(500).json({ error: "Error incrementing points." });
    }

    res.status(200).json({ message: "Points incremented successfully!" });
  });
});


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
      console.error("Error fetching accepted challenges:", err);
      return res.status(500).json({ error: "Error fetching accepted challenges." });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "No accepted challenges found for this user." });
    }

    res.status(200).json(data);
  });
});


module.exports = router;