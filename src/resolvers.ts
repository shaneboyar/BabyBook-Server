import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { IResolvers } from "graphql-tools";
import { upload } from "./utils/googleCloud";

export const resolvers: IResolvers = {
  Query: {
    async getUser(_root, { id }, { models }) {
      return models.User.findByPk(id);
    },
    async getUserByUUID(_root, { uuid }, { models }) {
      return models.User.findOne({ where: { uuid } });
    },
    async getAllUsers(_root, _args, { models }) {
      return models.User.findAll();
    },
    async getImage(_root, { id }, { models }) {
      return models.Image.findByPk(id);
    },
    async getAllImages(_root, _args, { models }) {
      return models.Image.findAll();
    }
  },
  Mutation: {
    async createUser(root, { name, uuid }, { models }) {
      return models.User.create({
        name,
        uuid
      });
    },
    async createImage(root, { file, latitude, longitude, UserId }, { models }) {
      const imageUrl = await upload(file);
      return models.Image.create({
        uri: imageUrl,
        latitude,
        longitude,
        UserId
      });
    }
  },
  User: {
    async images(images) {
      return images.getImages();
    }
  },
  Image: {
    async user(user) {
      return user.getUser();
    }
  }
};
