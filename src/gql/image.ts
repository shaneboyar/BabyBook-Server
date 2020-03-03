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
  async image(_root, { id }, { models, loaders }) {
    return loaders.Image.load(id);
  },
  async images(_root, _args, { models, loaders }) {
    return models.Image.findAll({
      order: [["createdAt", "DESC"]],
      include: models.favorite
    });
  },
  async userFavorites(_root, { UserId }, { models, loaders }) {
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
  async user(image, _args, { loaders }) {
    return loaders.User.load(image.UserId);
  },
  async favoriteUserIds(image, _args, { loaders }) {
    const users = await loaders.ImageFavoriteUsers.load(image.id);
    // const loadedImage = await loaders.Image.load(image.id);
    // return loadedImage.getFavorites().map((favorite: any) => {
    //   return favorite.UserId;
    // });
    return users.map((user: any) => user.id);
  },
  async metadata(image, _args, { loaders }) {
    const user = await loaders.User.load(image.UserId);
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
