const { db } = require("../connect.js");

// Add a new habit
const addHabit = (req, res) => {
  const { habit_name, description, category } = req.body;
  const user_id = req.user.id; // Assuming verifyToken middleware sets `req.user`
  const query = "INSERT INTO habits (user_id, habit_name, description, created_at, category) VALUES (?, ?, ?, CURDATE(), ?)";

  const values = [user_id, habit_name, description, category];

  db.query(query, values, (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json("Habit added successfully!");
  });
};

// Delete a habit
const deleteHabit = (req, res) => {
  const { habit_id } = req.params;

  const deleteQuery = "DELETE FROM habits WHERE hid = ?";
  const deleteChecklistQuery = "DELETE FROM daily_checklist WHERE habit_id = ?";

  // Delete related checklist entries first
  db.query(deleteChecklistQuery, [habit_id], (err) => {
    if (err) return res.status(500).json(err);

    // Delete the habit
    db.query(deleteQuery, [habit_id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json("Habit deleted successfully!");
    });
  });
};

// Check off a habit for the day
const checkOffHabit = (req, res) => {
  const { habit_id } = req.body;

  const query = "INSERT INTO daily_checklist (habit_id, date, is_completed) VALUES (?, CURDATE(), 1) ON DUPLICATE KEY UPDATE is_completed = 1";

  db.query(query, [habit_id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json("Habit marked as completed for today!");
  });
};

// Get habits by user and category
const getHabitsByCategory = (req, res) => {
  const { user_id, category } = req.params;

  const query = "SELECT * FROM habits WHERE user_id = ? AND category = ?";

  db.query(query, [user_id, category], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
};

module.exports = { addHabit, deleteHabit, checkOffHabit, getHabitsByCategory };
