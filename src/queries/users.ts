import { IResolverObject } from "apollo-server";

export default {
  async user(_root, { id }, { models }) {
    return models.User.findByPk(id);
  },
  async getUserByUUID(_root, { uuid }, { models }) {
    return models.User.findOne({ where: { uuid } });
  },
  async users(_root, _args, { models }) {
    return models.User.findAll();
  }
} as IResolverObject;
