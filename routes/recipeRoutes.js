const express = require('express');
const { createRecipe, getAllRecipes, getUserRecipes, deleteRecipe } = require('../controllers/recipeController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createRecipe); // Create recipe
router.get('/', getAllRecipes); // Get all recipes (public)
router.get('/my', authMiddleware, getUserRecipes); // User's own recipes
router.delete('/:id', authMiddleware, deleteRecipe); // Delete recipe

module.exports = router;
