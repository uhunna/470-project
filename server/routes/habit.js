const express = require("express");
const {
  addHabitController,
  deleteHabitController,
  checkOffHabitController,
} = require("../controller/habit.js");

const router = express.Router();

// Middleware to ensure the user is authenticated
router.use((req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
});

// Route to fetch all habits for the logged-in user
router.get("/", (req, res) => {
  const user_id = req.session.userId;

  const query = "SELECT * FROM habits WHERE user_id = ?";
  db.query(query, [user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
});

// Add a habit
router.post("/add", addHabitController);

// Delete a habit
router.delete("/delete/:habit_id", deleteHabitController);

// Check off a habit
router.post("/checkoff", checkOffHabitController);

module.exports = router;
