import { Sequelize } from "sequelize";
const env = process.env.NODE_ENV || "development";
import config from "./config";

const { dialect, username, password, database, host } = config[env];

const createSequelize = async () => {
  const sequelize = new Sequelize(
    `${dialect}://${username}:${password}@${host}:5432/${database}`
  );
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  return sequelize;
};

export default createSequelize;
