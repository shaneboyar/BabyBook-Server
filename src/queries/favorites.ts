import { IResolverObject } from "apollo-server";

export default {
  async favorites(_root, _args, { models }) {
    return models.Favorite.findAll();
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
