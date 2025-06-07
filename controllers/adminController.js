// controllers/adminController.js
const { User, Recipe } = require('../models');


exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      attributes: { exclude: ['password'] },
      limit,
      offset
    });

    res.status(200).json({
      total: count,
      page,
      pageCount: Math.ceil(count / limit),
      users: rows
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};


exports.getAllRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Recipe.findAndCountAll({
      limit,
      offset
    });

    res.status(200).json({
      total: count,
      page,
      pageCount: Math.ceil(count / limit),
      recipes: rows
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipes", error: err.message });
  }
};


exports.deleteAnyRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    await recipe.destroy();
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting recipe", error: err.message });
  }
};
