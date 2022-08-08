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

  type commant{
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
    comments:[commant]
    postAt: String
  }

  type Home {
    userInfo: User!
    posts: [Post]!
  }

  type reslut {
    status: Boolean!
    message: String
  }

  type Query {
    verifyUserName(userName: String!): reslut!
    verifyEmail(email: String!): reslut!
    home: Home
    getPost(postId:ID!): Post
  }

  type Mutation {
    signUp(userName: String!, email: String!, password: String!): User
    login(nameOrEmail: String!, password: String!): User
  }
`;

module.exports = { typeDefs };
