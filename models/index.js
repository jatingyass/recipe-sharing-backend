// models/index.js

const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// Import model functions
const UserModel = require('./user');
const RecipeModel = require('./Recipe');
const FavoriteModel = require('./favorites');

// Initialize models
const User = UserModel(sequelize, Sequelize.DataTypes);
const Recipe = RecipeModel(sequelize, Sequelize.DataTypes);
const Favorite = FavoriteModel(sequelize, Sequelize.DataTypes);


// Define associations here if needed in future
// Example: User.hasMany(Post); // etc.

// Define associations
User.hasMany(Favorite, { foreignKey: "userId" });
Favorite.belongsTo(User, { foreignKey: "userId" });

Recipe.hasMany(Favorite, { foreignKey: "recipeId" });
Favorite.belongsTo(Recipe, { foreignKey: "recipeId" });

// Export all models + sequelize instance
module.exports = {
  sequelize,
  Sequelize,
  User,
  Recipe,
  Favorite

};
