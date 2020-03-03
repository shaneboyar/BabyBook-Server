import DataLoader, { BatchLoadFn } from "dataloader";
import { ModelCtor, Model } from "sequelize/types";

const batchFunctionCreator = async (model: any) => {
  return async (keys: readonly number[]): Promise<any> => {
    const createMap = async () => {
      return Promise.all(
        keys.map(
          key =>
            model.findByPk(key) || new Error(`No result for ${model}:${key}`)
        )
      );
    };
    const map = await createMap();
    console.log("map: ", map);
    return map;
  };
};

const createLoaders = async (models: {
  [key: string]: ModelCtor<Model<any, any>>;
}) => {
  let loaders = {} as { [key: string]: DataLoader<number, any, string> };
  for (let model in models) {
    const batchFunction: BatchLoadFn<number, any> = await batchFunctionCreator(
      models[model]
    );
    loaders[model] = new DataLoader(batchFunction);
  }
  return loaders;
};

export const createImageFavoriteUsersLoader = (models: {
  [key: string]: any;
}) => {
  const batchFunction = async (imageIds: readonly number[]) => {
    const Images = await models.Image.findAll({
      include: [
        {
          model: models.User,
          as: "Likers",
          required: false
        }
      ]
    });
    const userIds: ArrayLike<number | null> = Images.map(
      (image: any) => image.Likers || new Error(`No result`)
    );
    return userIds;
  };
  return new DataLoader(batchFunction);
};

export default createLoaders;
