import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { IResolvers } from "graphql-tools";
import { upload } from "./utils/googleCloud";

export const resolvers: IResolvers = {
  Query: {
    async user(_root, { id }, { models }) {
      return models.User.findByPk(id);
    },
    async getUserByUUID(_root, { uuid }, { models }) {
      return models.User.findOne({ where: { uuid } });
    },
    async users(_root, _args, { models }) {
      return models.User.findAll();
    },
    async favorites(_root, _args, { models }) {
      return models.Favorite.findAll();
    },
    async userFavorites(_root, { UserId }, { models }) {
      console.log("UserId: ", UserId);
      // return models.Favorite.findAll({ where: { UserId } });
      return models.Favorite.findAll({
        where: { UserId },
        include: models.Image,
        order: [[models.Image, "createdAt", "DESC"]]
      }).map((favorite: any) => favorite.Image);
    },
    async image(_root, { id }, { models }) {
      return models.Image.findByPk(id);
    },
    async images(_root, _args, { models }) {
      return models.Image.findAll({
        order: [["createdAt", "DESC"]],
        include: models.Favorite
      });
    }
  },
  Mutation: {
    async createUser(root, { name, uuid }, { models }) {
      return models.User.create({
        name,
        uuid
      });
    },
    async createFavorite(root, { UserId, ImageId }, { models }) {
      await models.Favorite.create({
        UserId,
        ImageId
      });
      return models.Image.findByPk(ImageId);
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
      const userIds = favorites.map(({ dataValues }: any) => dataValues.UserId);
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
