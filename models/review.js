module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Review;
};
