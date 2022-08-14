const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    userName: String
    email: String
    followers: [ID]
    following: [ID]
    profilePic: String
    coverPic: String
    bio: String
    isVerified: Boolean
  }

  type file {
    type: String
    name: String
  }

  type comment {
    _id: ID
    content: String
    file: file
    likesCount: Int
    commentAt: String
    editedAt: String
    userInfo: User
  }

  type Post {
    _id: ID
    userInfo: User
    content: String
    file: file
    likesCount: Int
    commentsCount: Int
    comments: [comment]
    liked: Boolean
  }

  type Success {
    message: String
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
  union LIKE_POST_REQUEST = Success | Error
  union UNLIKE_POSt_REQUEST = Success | Error
  
  type Query {
    verifyUserName(userName: String!): VerifyNameOrEmailRequest!
    verifyEmail(email: String!): VerifyNameOrEmailRequest
    home: HomeRequest
    getPost(postId: ID!): GetPostRequest
  }

  type Mutation {
    signUp(userName: String!, email: String!, password: String!): User
    login(nameOrEmail: String!, password: String!): LoginRequest
    likePost(postId: ID!): LIKE_POST_REQUEST
    unLikePost(postId: ID!): LIKE_POST_REQUEST
  }
`;

module.exports = { typeDefs };
