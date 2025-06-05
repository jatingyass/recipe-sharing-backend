// controllers/favoritesController.js
const db = require("../models");
const Favorite = db.Favorite;

exports.addFavorite = async (req, res) => {
  const { recipeId } = req.body;
  try {
    const favorite = await Favorite.create({
      userId: req.user.id,
      recipeId
    });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      where: { userId: req.user.id },
      include: "Recipe"
    });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
