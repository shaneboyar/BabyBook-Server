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
    getUser(id: Int!): User
    getUserByUUID(uuid: String!): User
    getAllUsers: [User!]!
    getImage(id: Int!): Image
    getAllImages: [Image!]!
    getAllFavorites: [Favorite]!
    getUserFavorites(UserId: Int!): [Favorite]!
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
