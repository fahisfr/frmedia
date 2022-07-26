const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
  
    id: ID
    name: String
    email: String
    folowers: [ID]
    following: [ID]
    profilePic: String
    coverPic: String
    bio: String
    isVerified: Boolean
    
  }

  type CreateUserInput {
    name: String!
    email: String
    password: String!
  }

  type Query {
    getAllUsers: [User]
    userFind(name: String!): User
  }

  type Mutation{
    signUp(name:String! email:String! password:String!): User
    login(email:String! password:String!): User
  }

`;

module.exports = {typeDefs};
