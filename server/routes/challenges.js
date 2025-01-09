const express = require("express");
const router = express.Router();
const { db } = require("../connect.js");

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
router.post("/", (req, res) => {
  const { name, description } = req.body;

  // Validate request body
  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required." });
  }

  const created_by = 1; // Replace with dynamic user ID if needed in the future
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

