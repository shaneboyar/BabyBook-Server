import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar Date

  type Image {
    id: Int!
    uri: String
    latitude: Int
    longitude: Int
    timestamp: Date
    user: User!
  }

  type User {
    id: Int!
    name: String
    images: [Image]
  }

  type Query {
    getUser(id: Int!): User
    getAllUsers: [User!]!
    getImage(id: Int!): Image
    getAllImages: [Image!]!
  }

  type Mutation {
    createUser(name: String!): User!
    createImage(
      uri: String!
      latitude: Int!
      longitude: Int!
      timestamp: Date!
      UserId: Int!
    ): Image!
  }
`;
