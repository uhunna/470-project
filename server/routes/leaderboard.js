const express = require("express");
const router = express.Router();
const { getLeaderboard } = require("../controller/leaderboard.js");

// Endpoint to get the leaderboard
router.get("/", getLeaderboard);

module.exports = router;


