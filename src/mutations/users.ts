import { IResolverObject } from "apollo-server";

export default {
  async createUser(root, { name, uuid }, { models }) {
    return models.User.create({
      name,
      uuid
    });
  }
} as IResolverObject;
