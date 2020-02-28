import { IResolverObject } from "apollo-server";

export const userMutations = {
  async createUser(root, { user }, { models }) {
    const { name, uuid } = user;
    return models.User.create({
      name,
      uuid
    });
  }
} as IResolverObject;

export const userQueries = {
  // async user(_root, { id }, { models }) {
  //   return models.User.findByPk(id);
  // },
  // async getUserByUUID(_root, { uuid }, { models }) {
  //   return models.User.findOne({ where: { uuid } });
  // },
  async users(_root, _args, { models }) {
    return models.User.findAll();
  }
} as IResolverObject;

export default {
  async images(user: any) {
    return user.getImages();
  },
  async favorites(user: any) {
    return user.getFavorites();
  }
} as IResolverObject;
