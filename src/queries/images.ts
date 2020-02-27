import { IResolverObject } from "apollo-server";

export default {
  async image(_root, { id }, { models }) {
    return models.Image.findByPk(id);
  },
  async images(_root, _args, { models }) {
    return models.Image.findAll({
      order: [["createdAt", "DESC"]],
      include: models.Favorite
    });
  }
} as IResolverObject;
