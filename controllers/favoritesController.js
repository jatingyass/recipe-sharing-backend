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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Favorite.findAndCountAll({
      where: { userId: req.user.id },
      include: "Recipe",
      limit,
      offset
    });

    res.status(200).json({
      total: count,
      page,
      pageCount: Math.ceil(count / limit),
      favorites: rows
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
