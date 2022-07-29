const { gql } = require("apollo-server-express");

const typeDefs = gql`
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

  type reslut {
    approved: Boolean!
    message: String
  }

  type Query {
    verifyUserName(userName: String!): reslut!
    verifyEmail(email: String!): reslut!
  }

  type Mutation {
    signUp(userName: String!, email: String!, password: String!): User
    login(nameOrEmail: String!, password: String!): User
  }
`;

module.exports = { typeDefs };
