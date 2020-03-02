import { IResolverObject } from "apollo-server";
import { upload } from "../utils/googleCloud";
import { reverseGeocode } from "../utils/googleMaps";
import { sendNewPhotoNotification } from "../utils/expo";

export const imageMutations = {
  async createImage(
    root,
    { file, UserId, preview, latitude, longitude, title, story, milestone },
    { models }
  ) {
    try {
      const location = await reverseGeocode(latitude, longitude);
      const imageUrl = await upload(file);
      const users = await models.User.findAll();
      const image = await models.Image.create({
        uri: imageUrl,
        UserId,
        preview,
        latitude,
        longitude,
        location,
        title,
        story,
        milestone
      });
      const pushTokens: string[] = users
        .filter((user: typeof models.User) => user.id !== UserId)
        .map((user: typeof models.User) => user.uuid);
      pushTokens.length > 0 && sendNewPhotoNotification(image, pushTokens);
      return image;
    } catch (e) {
      console.warn("UPLOAD ERROR: ", e);
    }
  }
} as IResolverObject;

export const imageQueries = {
  async image(_root, { id }, { models }) {
    return models.Image.findByPk(id);
  },
  async images(_root, _args, { models }) {
    return models.Image.findAll({
      order: [["createdAt", "DESC"]],
      include: models.favorite
    });
  },
  async userFavorites(_root, { UserId }, { models }) {
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
    const user = await image.getUser();
    return {
      latitude: image.latitude,
      longitude: image.longitude,
      location: image.location,
      title: image.title,
      story: image.story,
      milestone: image.milestone,
      createdAt: image.createdAt,
      user: user.name
    };
  }
} as IResolverObject;
