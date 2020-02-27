import { IResolverObject } from "apollo-server";

export default {
  async createFavorite(root, { UserId, ImageId }, { models }) {
    await models.Favorite.create({
      UserId,
      ImageId
    });

    return await models.Image.findByPk(ImageId, { include: models.Favorite });
  },
  async destroyFavorite(root, { UserId, ImageId }, { models }) {
    const favorite = await models.Favorite.findOne({
      where: { UserId, ImageId }
    });
    await favorite.destroy();
    return await models.Image.findByPk(ImageId, { include: models.Favorite });
  }
} as IResolverObject;
