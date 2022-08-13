const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    userName: String!
    email: String!
    followers: [ID]!
    following: [ID]!
    profilePic: String!
    coverPic: String!
    bio: String!
    isVerified: Boolean!
  }

  type file {
    type: String
    name: String
  }

  type commant {
    _id: ID!
    content: String
    file: file
    likes: [ID]
    commentAt: String
    editedAt: String
    userInfo: User
  }

  type Post {
    _id: ID
    userInfo: User
    content: String
    file: file
    likes: [ID]
    comments: [commant]
    postAt: String
    editedAt: String
  }

  type Success {
    message: String!
  }

  type VerifyData {
    status: Boolean
    message: String
  }

  type Error {
    message: String
  }

  type home {
    userInfo: User!
    posts: [Post]
  }

  union LoginRequest = Success | Error
  union VerifyNameOrEmailRequest = VerifyData | Error
  union GetPostRequest = Post | Error
  union SingPpRequest = Success | Error
  union HomeRequest = home | Error

  type Query {
    verifyUserName(userName: String!): VerifyNameOrEmailRequest!
    verifyEmail(email: String!): VerifyNameOrEmailRequest
    home: HomeRequest
    getPost(postId: ID!): GetPostRequest
  }

  type Mutation {
    signUp(userName: String!, email: String!, password: String!): User
    login(nameOrEmail: String!, password: String!): LoginRequest
  }
`;

module.exports = { typeDefs };
