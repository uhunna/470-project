// /server/routes/user.js
const express = require("express");
const { getUser, getAllUsers } = require("../controller/user.js");
const verifyToken = require("../middlewares/verifyToken"); // Import middleware
const router = express.Router();

router.get("/find/:userId", verifyToken, getUser); // Protect this route
router.get("/all", verifyToken, getAllUsers); // Protect this route

module.exports = router;