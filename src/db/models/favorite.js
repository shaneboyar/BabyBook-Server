"use strict";
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    "Favorite",
    {
      ImageId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER
    },
    {}
  );
  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsTo(models.Image);
    Favorite.belongsTo(models.User);
  };
  return Favorite;
};
