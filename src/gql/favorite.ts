import { IResolverObject } from "apollo-server";

export const favoriteMutations = {
  async createFavorite(root, { favorite }, { models }) {
    const { UserId, ImageId } = favorite;
    return await models.Favorite.create({
      UserId,
      ImageId
    });
  },
  async destroyFavorite(root, { favorite }, { models }) {
    const { UserId, ImageId } = favorite;
    const record = await models.Favorite.findOne({
      where: { UserId, ImageId }
    });
    await record.destroy();
    return record;
  }
} as IResolverObject;

export const favoriteQueries = {
  // async ( {_root, _args, { models }) {
  //   return models.favorite.findAll();
  // },
  // async userFavorites(_root, { UserId }, { models }) {
  //   return models.Image.findAll({
  //     order: [["createdAt", "DESC"]],
  //     include: {
  //       model: models.favorite,
  //       where: { UserId }
  //     }
  //   });
  // }
} as IResolverObject;

export default {
  async image(favorite) {
    return favorite.getImage();
  },
  async user(favorite) {
    return favorite.getUser();
  }
} as IResolverObject;
