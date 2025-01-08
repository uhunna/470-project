const express = require("express");
const router = express.Router();
const { db } = require("../connect.js");
const verifyToken = require("../middlewares/verifyToken.js"); // Import the middleware

// GET all challenges
router.get("/", (req, res) => {
  const query = "SELECT * FROM challenge";

  db.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching challenges:", err);
      return res.status(500).json({ error: "Error fetching challenges." });
    }

    res.status(200).json(data);
  });
});

// POST new challenge
router.post("/", verifyToken, (req, res) => {
  const { name, description } = req.body;
  const created_by = req.user.id
  
  // Validate request body
  if (!name || !description) {
    return res
      .status(400)
      .json({ error: "Name and description are required." });
  }

  ; // Extract user ID from verified token

  const insertQuery = `
    INSERT INTO challenge (name, description, created_by)
    VALUES (?, ?, ?)
  `;

  db.query(insertQuery, [name, description, created_by], (err, result) => {
    if (err) {
      console.error("Error creating challenge:", err);
      return res.status(500).json({ error: "Error creating challenge." });
    }

    res.status(201).json({
      message: "Challenge created successfully!",
      challenge: { id: result.insertId, name, description, created_by },
    });
  });
});

module.exports = router;
