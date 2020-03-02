import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar Date

  input File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type ImageMetadata {
    latitude: Float!
    longitude: Float!
    location: String
    title: String
    story: String
    milestone: String
    createdAt: Date!
    user: String!
  }

  type Image {
    id: Int!
    uri: String!
    preview: String!
    metadata: ImageMetadata
    user: User!
    favoriteUserIds: [Int]!
  }

  input UserInput {
    name: String!
    uuid: String!
  }

  type User {
    id: Int!
    name: String!
    images: [Image]!
    favorites: [Favorite]!
    uuid: String!
  }

  input FavoriteInput {
    UserId: ID!
    ImageId: ID!
  }

  type Favorite {
    id: Int!
    user: User!
    image: Image!
  }

  type Query {
    # user(id: Int!): User
    # getUserByUUID(uuid: String!): User
    users: [User]!
    # image(id: Int!): Image
    images: [Image]!
    image(id: Int!): Image
    favorites: [Favorite]!
    userFavorites(UserId: Int!): [Image]!
  }

  type Mutation {
    createUser(user: UserInput!): User!
    createFavorite(favorite: FavoriteInput!): Favorite!
    destroyFavorite(favorite: FavoriteInput!): Favorite!
    createImage(
      UserId: Int!
      file: Upload!
      preview: String!
      latitude: Float!
      longitude: Float!
      title: String
      story: String
      milestone: String
    ): Image!
  }
`;
