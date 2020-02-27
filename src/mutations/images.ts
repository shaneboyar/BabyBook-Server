import { IResolverObject } from "apollo-server";
import { upload } from "../utils/googleCloud";

export default {
  async createImage(
    root,
    { file, latitude, longitude, UserId, preview },
    { models }
  ) {
    try {
      const imageUrl = await upload(file);
      return models.Image.create({
        uri: imageUrl,
        latitude,
        longitude,
        UserId,
        preview
      });
    } catch (e) {
      console.warn("UPLOAD ERROR: ", e);
    }
  }
} as IResolverObject;
