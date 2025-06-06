const { Follow, Recipe, Review, User } = require("../models");

exports.getActivityFeed = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get following users
    const follows = await Follow.findAll({ where: { followerId: userId } });
    const followingIds = follows.map(f => f.followingId);

    // Get recipes and reviews from followed users
    const recipes = await Recipe.findAll({
      where: { userId: followingIds },
      include: [{ model: User, attributes: ['name'] }],
    });

    const reviews = await Review.findAll({
      where: { userId: followingIds },
      include: [{ model: User, attributes: ['name'] }],
    });

    res.status(200).json({ recipes, reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
