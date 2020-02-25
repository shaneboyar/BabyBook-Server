import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar Date

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Image {
    id: Int!
    uri: String!
    latitude: Int
    longitude: Int
    user: User!
    file: File!
    createdAt: Date!
    likers: [Int]!
  }

  type User {
    id: Int!
    name: String
    images: [Image]
    favorites: [Favorite]
    uuid: String
  }

  type Favorite {
    UserId: Int!
    ImageId: Int!
    Image: Image!
  }

  type Query {
    user(id: Int!): User
    getUserByUUID(uuid: String!): User
    users: [User!]!
    image(id: Int!): Image
    images: [Image!]!
    favorites: [Favorite]!
    userFavorites(UserId: Int!): [Image]!
  }

  type Mutation {
    createUser(name: String!, uuid: String!): User!
    createFavorite(UserId: Int!, ImageId: Int!): Favorite!
    createImage(
      latitude: Float!
      longitude: Float!
      UserId: Int!
      file: Upload!
    ): Image!
  }
`;
