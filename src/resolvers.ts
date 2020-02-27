import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { IResolvers } from "graphql-tools";
import queries from "./queries";
import mutations from "./mutations";

export const resolvers: IResolvers = {
  Query: queries,
  Mutation: mutations,
  User: {
    async images(user) {
      return user.getImages();
    },
    async favorites(user) {
      return user.getFavorites();
    }
  },
  Image: {
    async user(image) {
      return image.user();
    },
    async likers(image, root, { models }) {
      const favorites = await image.Favorites;
      const userIds = favorites
        ? favorites.map(({ dataValues }: any) => dataValues.UserId)
        : [];
      return userIds;
    }
  },
  Favorite: {
    async Image(favorite) {
      return favorite.image();
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
