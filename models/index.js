// models/index.js

const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// Import model functions
const UserModel = require('./user');
const RecipeModel = require('./Recipe');
const FavoriteModel = require('./favorites');
const CollectionModel = require('./collections');
const CollectionRecipeModel = require('./collectionrecipes');

// Initialize models
const User = UserModel(sequelize, Sequelize.DataTypes);
const Recipe = RecipeModel(sequelize, Sequelize.DataTypes);
const Favorite = FavoriteModel(sequelize, Sequelize.DataTypes);
const Collection = CollectionModel(sequelize, Sequelize.DataTypes);
const CollectionRecipe = CollectionRecipeModel(sequelize, Sequelize.DataTypes);


// Define associations here if needed in future
// Example: User.hasMany(Post); // etc.

// Define associations
User.hasMany(Favorite, { foreignKey: "userId" });
Favorite.belongsTo(User, { foreignKey: "userId" });

Recipe.hasMany(Favorite, { foreignKey: "recipeId" });
Favorite.belongsTo(Recipe, { foreignKey: "recipeId" });

// ✅ Collection belongs to User
User.hasMany(Collection, { foreignKey: "userId" });
Collection.belongsTo(User, { foreignKey: "userId" });

// ✅ Many-to-Many: Collections <-> Recipes
Collection.belongsToMany(Recipe, {
  through: CollectionRecipe,
  foreignKey: "collectionId"
});
Recipe.belongsToMany(Collection, {
  through: CollectionRecipe,
  foreignKey: "recipeId"
});


// Export all models + sequelize instance
module.exports = {
  sequelize,
  Sequelize,
  User,
  Recipe,
  Favorite,
  Collection,
  CollectionRecipe

};
