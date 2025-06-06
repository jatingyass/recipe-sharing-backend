// models/collectionrecipes.js
module.exports = (sequelize, DataTypes) => {
  const CollectionRecipe = sequelize.define("CollectionRecipe", {
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return CollectionRecipe;
};
