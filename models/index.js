// models/index.js

const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// Import model functions
const UserModel = require('./user');
const RecipeModel = require('./Recipe');


// Initialize models
const User = UserModel(sequelize, Sequelize.DataTypes);
const Recipe = RecipeModel(sequelize, Sequelize.DataTypes);


// Define associations here if needed in future
// Example: User.hasMany(Post); // etc.

// Export all models + sequelize instance
module.exports = {
  sequelize,
  Sequelize,
  User,
  Recipe
};
