import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { IResolvers } from "graphql-tools";

export const resolvers: IResolvers = {
  Query: {
    async getUser(_root, { id }, { models }) {
      return models.User.findByPk(id);
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
    async createUser(root, { name }, { models }) {
      return models.User.create({
        name
      });
    },
    async createImage(
      root,
      { uri, latitude, longitude, timestamp, UserId },
      { models }
    ) {
      return models.Image.create({
        uri,
        latitude,
        longitude,
        timestamp,
        UserId
      });
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
  }),
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
