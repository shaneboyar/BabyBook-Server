import favoritesMutations from "./favorites";
import imagesMutations from "./images";
import usersMutations from "./users";

export default {
  ...favoritesMutations,
  ...imagesMutations,
  ...usersMutations
};
