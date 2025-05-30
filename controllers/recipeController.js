const {Recipe} = require('../models');

exports.createRecipe = async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      image,
      userId: req.user.id // from token
    });

    res.status(201).json({ message: 'Recipe created', recipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({ where: { userId: req.user.id } });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findOne({ where: { id, userId: req.user.id } });
    if (!recipe) return res.status(404).json({ message: 'Recipe not found or unauthorized' });

    await recipe.destroy();
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions } = req.body;

  try {
    const recipe = await Recipe.findOne({ where: { id, userId: req.user.id } });

    if (!recipe) return res.status(404).json({ message: 'Recipe not found or unauthorized' });

    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;

    await recipe.save();

    res.json({ message: 'Recipe updated', recipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
