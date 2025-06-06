// models/collections.js
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define("Collection", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return Collection;
};
