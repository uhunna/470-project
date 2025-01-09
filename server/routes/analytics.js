const express = require("express");
const {
  getWeeklyAnalytics,
  getMonthlyAnalytics,
  getBadges,
} = require("../controller/analytics.js");

const router = express.Router();

// Routes for analytics
router.get("/weekly", getWeeklyAnalytics);
router.get("/monthly", getMonthlyAnalytics);
router.get("/badges", getBadges);

module.exports = router;
