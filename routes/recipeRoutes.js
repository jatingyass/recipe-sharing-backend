const express = require('express');
const { createRecipe, getAllRecipes, getUserRecipes, deleteRecipe, updateRecipe } = require('../controllers/recipeController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const authorize = require('../middlewares/authorize'); // ✅ Add this line

const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), createRecipe); // Create recipe
router.get('/', getAllRecipes); // Get all recipes (public)
router.get('/my', authMiddleware, getUserRecipes); // User's own recipes
// ✅ Admin-only: Get all recipes (including private or for dashboard)
router.get('/admin', authMiddleware, authorize(['admin']), getAllRecipes); // ✅ Add this route

router.delete('/:id', authMiddleware, deleteRecipe); // Delete recipe
router.put('/:id', authMiddleware, updateRecipe); // put recipe

module.exports = router;
