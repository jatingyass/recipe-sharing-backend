const { Review, Rating } = require('../models');

exports.postReview = async (req, res) => {
  const { recipeId, review } = req.body;
  const userId = req.user.id;

  try {
    const newReview = await Review.create({ userId, recipeId, review });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Error posting review" });
  }
};

exports.postRating = async (req, res) => {
  const { recipeId, rating } = req.body;
  const userId = req.user.id;

  try {
    const existing = await Rating.findOne({ where: { userId, recipeId } });

    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.json(existing);
    }

    const newRating = await Rating.create({ userId, recipeId, rating });
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: "Error posting rating" });
  }
};

exports.getReviewsByRecipe = async (req, res) => {
  const recipeId = req.params.id;

  try {
    const reviews = await Review.findAll({ where: { recipeId } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
};
