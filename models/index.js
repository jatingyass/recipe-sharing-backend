const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// Import model functions
const UserModel = require('./user');
const RecipeModel = require('./Recipe');
const FavoriteModel = require('./favorites');
const CollectionModel = require('./collections');
const CollectionRecipeModel = require('./collectionrecipes');
const ReviewModel = require('./review');
const RatingModel = require('./rating');

// Initialize models
const User = UserModel(sequelize, Sequelize.DataTypes);
const Recipe = RecipeModel(sequelize, Sequelize.DataTypes);
const Favorite = FavoriteModel(sequelize, Sequelize.DataTypes);
const Collection = CollectionModel(sequelize, Sequelize.DataTypes);
const CollectionRecipe = CollectionRecipeModel(sequelize, Sequelize.DataTypes);
const Review = ReviewModel(sequelize, Sequelize.DataTypes);
const Rating = RatingModel(sequelize, Sequelize.DataTypes);

// Associations

// Favorites
User.hasMany(Favorite, { foreignKey: "userId" });
Favorite.belongsTo(User, { foreignKey: "userId" });

Recipe.hasMany(Favorite, { foreignKey: "recipeId" });
Favorite.belongsTo(Recipe, { foreignKey: "recipeId" });

// Collections
User.hasMany(Collection, { foreignKey: "userId" });
Collection.belongsTo(User, { foreignKey: "userId" });

Collection.belongsToMany(Recipe, {
  through: CollectionRecipe,
  foreignKey: "collectionId"
});
Recipe.belongsToMany(Collection, {
  through: CollectionRecipe,
  foreignKey: "recipeId"
});

// ⭐ Reviews
User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

Recipe.hasMany(Review, { foreignKey: "recipeId" });
Review.belongsTo(Recipe, { foreignKey: "recipeId" });

// ⭐ Ratings
User.hasMany(Rating, { foreignKey: "userId" });
Rating.belongsTo(User, { foreignKey: "userId" });

Recipe.hasMany(Rating, { foreignKey: "recipeId" });
Rating.belongsTo(Recipe, { foreignKey: "recipeId" });

// Export everything
module.exports = {
  sequelize,
  Sequelize,
  User,
  Recipe,
  Favorite,
  Collection,
  CollectionRecipe,
  Review,
  Rating
};
