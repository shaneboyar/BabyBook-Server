import { IResolverObject } from "apollo-server";
import { upload } from "../utils/googleCloud";

export const imageMutations = {
  async createImage(
    root,
    { file, UserId, preview, latitude, longitude, title, story, milestone },
    { models }
  ) {
    console.log(
      "{ file, UserId, latitude, longitude, title, story, milestone }: ",
      { file, UserId, latitude, longitude, title, story, milestone }
    );
    try {
      const imageUrl = await upload(file);
      return models.Image.create({
        uri: imageUrl,
        UserId,
        preview,
        latitude,
        longitude,
        title,
        story,
        milestone
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
  },
  async metadata(image) {
    return {
      latitude: image.latitude,
      longitude: image.longitude,
      title: image.title,
      story: image.story,
      milestone: image.milestone,
      createdAt: image.createdAt
    };
  }
} as IResolverObject;
