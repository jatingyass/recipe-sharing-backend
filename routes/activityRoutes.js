const express = require("express");
const router = express.Router();
const { getActivityFeed } = require("../controllers/activityController");
const authenticate = require("../middlewares/authMiddleware");

router.get("/", authenticate, getActivityFeed);

module.exports = router;
