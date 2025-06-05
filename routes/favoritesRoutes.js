// routes/favoritesRoutes.js
const express = require("express");
const router = express.Router();
const { addFavorite, getFavorites } = require("../controllers/favoritesController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/", authenticate, addFavorite);
router.get("/", authenticate, getFavorites);

module.exports = router;
