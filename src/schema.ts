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
  }

  type User {
    id: Int!
    name: String
    images: [Image]
    uuid: String
  }

  type Query {
    getUser(id: Int!): User
    getUserByUUID(uuid: String!): User
    getAllUsers: [User!]!
    getImage(id: Int!): Image
    getAllImages: [Image!]!
  }

  type Mutation {
    createUser(name: String!, uuid: String!): User!
    createImage(
      latitude: Float!
      longitude: Float!
      UserId: Int!
      file: Upload!
    ): Image!
  }
`;
