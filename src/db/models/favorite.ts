import { Sequelize, Model } from "sequelize";
class Favorite extends Model {}

const createFavorite = (sequelize: Sequelize) => {
  Favorite.init(
    {},
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "Favorite" // We need to choose the model name
    }
  );

  return Favorite;
};

export default createFavorite;
