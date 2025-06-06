// routes/collectionsRoutes.js
const express = require("express");
const router = express.Router();
const { createCollection, addRecipeToCollection, getUserCollections } = require("../controllers/collectionsController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/", authenticate, createCollection);
router.post("/:collectionId/add", authenticate, addRecipeToCollection);
router.get("/", authenticate, getUserCollections);

module.exports = router;
