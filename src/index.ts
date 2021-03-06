import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import createSequelize from "./db";
import createModels from "./db/models";
require("dotenv").config();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

(async () => {
  const sequelize = await createSequelize();
  const models = await createModels(sequelize);
  const server = new ApolloServer({ typeDefs, resolvers, context: { models } });
  // The `listen` method launches a web server.
  server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();
