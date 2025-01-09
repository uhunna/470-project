const { db } = require("./connect.js");

// Add a habit
const addHabit = (habitData, callback = () => {}) => {
  const {
    user_id,
    habit_name,
    description,
    created_at,
    category = "Miscellaneous",
  } = habitData;

  if (!user_id || !habit_name || !description) {
    return callback(new Error("Missing required habit fields"), null);
  }

  db.query(
    "INSERT INTO habits (habit_name, user_id, description, created_at, category) VALUES (?, ?, ?, ?, ?, ?)",
    [habit_name, user_id, description, created_at, category],
    (err, result) => {
      if (err) {
        console.error("Error inserting habit:", err);
        return callback(err, null);
      }
      callback(null, { id: result.insertId, name: habit_name, category });
    }
  );
};

// Fetch habits by user ID
const getHabitsByUserId = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM habits WHERE user_id = ?", [user_id], (err, results) => {
      if (err) {
        console.error("Error fetching habits:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Delete a habit by habit ID and user ID
const deleteHabit = (hid, user_id, callback = () => {}) => {
  const query = "DELETE FROM habits WHERE hid = ? AND user_id = ?";
  db.query(query, [hid, user_id], (err, result) => {
    if (err) {
      console.error("Error deleting habit:", err);
      return callback(err, null);
    }
    callback(null, result.affectedRows > 0);
  });
};

// Mark a habit as checked off
const checkOffHabit = (hid, dateCompleted, callback = () => {}) => {
  const query = "INSERT INTO daily_checklist (habit_id, date, is_completed) VALUES (?, ?, ?)";
  db.query(query, [hid, dateCompleted, true], (err, result) => {
    if (err) {
      console.error("Error checking off habit:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Undo the habit check-off
const undoHabitCheckOff = (hid, dateCompleted, callback = () => {}) => {
  const query = "DELETE FROM daily_checklist WHERE habit_id = ? AND date = ?";
  db.query(query, [hid, dateCompleted], (err, result) => {
    if (err) {
      console.error("Error undoing check-off:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Check if the habit has already been checked off today
const checkIfHabitCheckedOffToday = (hid, date, callback = () => {}) => {
  const query = "SELECT * FROM daily_checklist WHERE habit_id = ? AND date = ?";
  db.query(query, [hid, date], (err, results) => {
    if (err) {
      console.error("Error checking if habit is checked off:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Add a goal
const addGoal = (habitId, streak, callback = () => {}) => {
  const query = "INSERT INTO goals (habit_id, streak) VALUES (?, ?)";
  db.query(query, [habitId, streak], (err, result) => {
    if (err) {
      console.error("Error adding goal:", err);
      return callback(err, null);
    }
    callback(null, { id: result.insertId, habitId, streak });
  });
};
module.exports = {
  addHabit,
  getHabitsByUserId,
  deleteHabit,
  checkOffHabit,
  undoHabitCheckOff,
  checkIfHabitCheckedOffToday,
  addGoal,
};
