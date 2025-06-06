const express = require("express");
const router = express.Router();
const { followUser } = require("../controllers/followController");
const authenticate  = require("../middlewares/authMiddleware");

router.post("/", authenticate, followUser);

module.exports = router;
 