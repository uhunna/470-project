const { db } = require("../connect.js");

// Get all users except the logged-in user
const getAllUsersExceptSelf = (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT id, username, name FROM user WHERE id != ?";

  db.query(query, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Get the current user's friend list with usernames
const getFriends = (req, res) => {
  const userId = req.params.userId;

  // Query to get friends' information
  const query = `
    SELECT u.id, u.username, u.name
    FROM friends f
    JOIN user u ON u.id = f.friend_id
    WHERE f.user_id = ?
    UNION
    SELECT u.id, u.username, u.name
    FROM friends f
    JOIN user u ON u.id = f.user_id
    WHERE f.friend_id = ?;
  `;

  db.query(query, [userId, userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Add a friend
const addFriend = (req, res) => {
  const { userId, friendId } = req.body; // Get the userId and friendId from the request body

  // Insert into the friends table
  const query = "INSERT INTO friends (user_id, friend_id) VALUES (?, ?)";
  db.query(query, [userId, friendId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Friend added successfully!" });
  });
};

module.exports = { getAllUsersExceptSelf, getFriends, addFriend };