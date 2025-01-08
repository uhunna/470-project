const express = require("express");
const {
  getWeeklyAnalytics,
  getMonthlyAnalytics,
  getBadges,
} = require("../controller/analytics.js");
const verifyToken = require("../middlewares/verifyToken.js"); 

const router = express.Router();

router.get("/weekly", verifyToken, getWeeklyAnalytics); // Secure the route
router.get("/monthly", verifyToken, getMonthlyAnalytics); // Secure the route
router.get("/badges", verifyToken, getBadges); // Secure the route

module.exports = router;
