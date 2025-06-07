// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const { getAllUsers, getAllRecipes, deleteAnyRecipe } = require('../controllers/adminController');
const auth = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');

router.get('/users', auth, authorize(['admin']), getAllUsers);
router.get('/recipes', auth, authorize(['admin']), getAllRecipes);
router.delete('/recipes/:id', auth, authorize(['admin']), deleteAnyRecipe);

module.exports = router;
