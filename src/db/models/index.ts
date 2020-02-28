import { Sequelize } from "sequelize";
import createFavorite from "./favorite";
import createImage from "./image";
import createUser from "./user";

const createModels = async (sequelize: Sequelize) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  const User = createUser(sequelize);
  const Image = createImage(sequelize);
  const Favorite = createFavorite(sequelize);

  User.hasMany(Image);
  User.hasMany(Favorite);

  Image.belongsTo(User);
  Image.hasMany(Favorite);

  Favorite.belongsTo(Image);
  Favorite.belongsTo(User);

  try {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to sync the database:", error);
  }
  return sequelize.models;
};

export default createModels;
