const express = require('express');
const { createRecipe, getAllRecipes, getUserRecipes, deleteRecipe, updateRecipe } = require('../controllers/recipeController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), createRecipe); // Create recipe
router.get('/', getAllRecipes); // Get all recipes (public)
router.get('/my', authMiddleware, getUserRecipes); // User's own recipes
router.delete('/:id', authMiddleware, deleteRecipe); // Delete recipe
router.put('/:id', authMiddleware, updateRecipe); // put recipe

module.exports = router;
