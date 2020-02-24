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
      return models.Image.findAll({ order: [["createdAt", "DESC"]] });
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
      try {
        const imageUrl = await upload(file);
        console.log("imageUrl: ", imageUrl);

        return models.Image.create({
          uri: imageUrl,
          latitude,
          longitude,
          UserId
        });
      } catch (e) {
        console.log("UPLOAD ERROR: ", e);
      }
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
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  })
};
