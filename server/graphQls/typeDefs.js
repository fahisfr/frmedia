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

  type Reply {
    _id: ID

    content: String
    file: file
    createdAt: String
    likesCount: Int
    liked: Boolean
  }

  type comment {
    _id: ID
    content: String
    file: file
    likesCount: Int
    commentAt: String
    editedAt: String
    userInfo: User
    repliesCount: Int
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

  type reply {
    _id: ID
    userInfo: User
    content: String
    file: file
    createdAt: String
    likesCount: Int
  }

  type replies {
    replies: [reply]
  }

  union request = Success | Error
  union LoginRequest = Success | Error
  union VerifyNameOrEmailRequest = VerifyData | Error
  union GetPostRequest = Post | Error
  union HomeRequest = home | Error
  union getCommentRepliesRequest = replies | Error

  type Query {
    verifyUserName(userName: String!): VerifyNameOrEmailRequest!
    verifyEmail(email: String!): VerifyNameOrEmailRequest
    home: HomeRequest
    getPost(postId: ID!): GetPostRequest
    getCommentReplies(postId: ID!, commentId: ID!): getCommentRepliesRequest
  }

  type Mutation {
    signUp(userName: String!, email: String!, password: String!): User
    login(nameOrEmail: String!, password: String!): request
    likePost(postId: ID!): request
    unLikePost(postId: ID!): request
    likeComment(postId: ID!, commentId: ID!): request
    unLikeComment(postId: ID!, commentId: ID!): request
    likeReply(postId: ID!, commentId: ID!, replyId: ID!): request
    unLikeReply(postId: ID!, commentId: ID!, replyId: ID!): request
    

  }
`;

module.exports = { typeDefs };
