import favoritesQueries from "./favorites";
import imagesQueries from "./images";
import usersQueries from "./users";

export default {
  ...favoritesQueries,
  ...imagesQueries,
  ...usersQueries
};
