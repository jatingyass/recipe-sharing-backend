module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define("Favorite", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return Favorite;
};
