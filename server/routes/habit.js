// routes/habit.js
const express = require("express");
const {
  addHabit,
  deleteHabit,
  checkOffHabit,
  getHabitsByCategory,
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

// Other routes remain unchanged
router.post("/add", verifyToken, addHabit);
router.delete("/delete/:habit_id", deleteHabit);
router.post("/checkoff", checkOffHabit);
router.get("/category/:user_id/:category", getHabitsByCategory);

module.exports = router;
