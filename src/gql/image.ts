import { IResolverObject } from "apollo-server";
import { upload } from "../utils/googleCloud";

export const imageMutations = {
  async createImage(root, { file, UserId, preview }, { models }) {
    try {
      const imageUrl = await upload(file);
      return models.Image.create({
        uri: imageUrl,
        UserId,
        preview
      });
    } catch (e) {
      console.warn("UPLOAD ERROR: ", e);
    }
  }
} as IResolverObject;

export const imageQueries = {
  // async image(_root, { id }, { models }) {
  //   return models.Image.findByPk(id);
  // },
  async images(_root, _args, { models }) {
    console.log("models: ", models.Image);
    return models.Image.findAll({
      order: [["createdAt", "DESC"]],
      include: models.favorite
    });
  },
  async userFavorites(_root, { UserId }, { models }) {
    console.log("UserId: ", UserId);
    return models.Image.findAll({
      order: [["createdAt", "DESC"]],
      include: {
        model: models.Favorite,
        where: { UserId }
      }
    });
  }
} as IResolverObject;

export default {
  async user(image) {
    return image.getUser();
  },
  async favoriteUserIds(image) {
    return image.getFavorites().map((favorite: any) => {
      return favorite.UserId;
    });
  }
} as IResolverObject;
