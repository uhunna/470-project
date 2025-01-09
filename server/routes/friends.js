const express = require("express");
const { getAllUsersExceptSelf, getFriends, addFriend } = require("../controller/friends");
const router = express.Router();

router.get("/:userId/all", getAllUsersExceptSelf);

router.get("/list/:userId", getFriends);

router.post("/add", addFriend);

module.exports = router;