const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar FileUpload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type User {
    userName: String!
    email: String!
    followers: [ID]!
    following: [ID]!
    profilePic: String!
    coverPic: String!
    bio: String!
    isVerified: Boolean!
    token: String!
  }
  type Post {
    _id: ID!
    userName: String!
    caption: String!
    file: String!
    likes: [ID]
    comments: [ID]
    createdAt: String!
    updatedAt: String!
  }

  type HomePage {
    userInfo: User!
    posts: [Post]
  }

  type reslut {
    success: Boolean!
    message: String
  }

  type Query {
    verifyUserName(userName: String!): reslut!
    verifyEmail(email: String!): reslut!

  }

  type Mutation {
    signUp(userName: String!, email: String!, password: String!): User
    login(nameOrEmail: String!, password: String!): User
    addPost(post: String, file: FileUpload): reslut
  }
`;

module.exports = { typeDefs };
