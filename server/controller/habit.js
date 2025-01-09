const { addHabit, deleteHabit, checkOffHabit, getHabitsByUserId } = require("../model.js");

// Add a new habit
const addHabitController = (req, res) => {
  const habitData = {
    user_id: req.session.userId, // Use session to get user ID
    habit_name: req.body.habit_name,
    description: req.body.description,
    created_at: new Date(),
    category: req.body.category || "Miscellaneous",
  };

  addHabit(habitData, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to add habit." });
    res.status(200).json(result);
  });
};

// Delete a habit
const deleteHabitController = (req, res) => {
  const habit_id = req.params.habit_id;
  const user_id = req.session.userId; // Use session to get user ID

  deleteHabit(habit_id, user_id, (err, success) => {
    if (err) return res.status(500).json({ error: "Failed to delete habit." });
    if (!success) return res.status(404).json({ error: "Habit not found or unauthorized." });
    res.status(200).json({ message: "Habit deleted successfully." });
  });
};

// Check off a habit for today
const checkOffHabitController = (req, res) => {
  const habit_id = req.body.habit_id;

  checkOffHabit(habit_id, new Date(), (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to check off habit." });
    res.status(200).json({ message: "Habit marked as completed for today." });
  });
};

module.exports = {
  addHabitController,
  deleteHabitController,
  checkOffHabitController,
};

