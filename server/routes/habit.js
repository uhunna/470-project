const express = require("express");
const {
  addHabitController,
  deleteHabitController,
  checkOffHabitController,
} = require("../controller/habit.js");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Route to fetch all habits for the logged-in user
router.get("/", verifyToken, (req, res) => {
  const user_id = req.user.id;

  const query = "SELECT * FROM habits WHERE user_id = ?";
  db.query(query, [user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
});

// Add a habit
router.post("/add", verifyToken, addHabitController);

// Delete a habit
router.delete("/delete/:habit_id", verifyToken, deleteHabitController);

// Check off a habit
router.post("/checkoff", verifyToken, checkOffHabitController);

module.exports = router;