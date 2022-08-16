import { gql, useMutation } from "@apollo/client";
import { POST_FIELDS, USER_FIELDS, COMMENT_FIELDS } from "../graphql/fragments";

const ADD_COMMENT = gql`
  mutation comment($postId: ID!, $comment: String!) {
    addComment(postId: $postId, comment: $comment) {
      status
      message
    }
  }
`;

const LOGIN = gql`
  mutation login($nameOrEmail: String!, $password: String!) {
    login(nameOrEmail: $nameOrEmail, password: $password) {
      ... on Success {
        message
      }
      ... on Error {
        message
      }
    }
  }
`;

const SING_UP = gql`
  mutation signUp($userName: String!, $email: String!, $password: String!) {
    signUp(userName: $userName, email: $email, password: $password) {
      ... on Success {
        message
      }
      ... on Error {
        message
      }
    }
  }
`;

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      ... on Success {
        message
      }
      ... on Error {
        message
      }
    }
  }
`;

const UNLIKE_POST = gql`
  mutation unlikePost($postId: ID!) {
    unLikePost(postId: $postId) {
      ... on Success {
        message
      }
      ... on Error {
        message
      }
    }
  }
`;

const REPLAY_TO_COMMENT = gql`
  mutation replayToComment($postId: ID!, $commentId: ID!, $comment: String!) {
    replayToComment(postId: $postId, commentId: $commentId, comment: $comment) {
      ... on Success {
        message
      }
      ... on Error {
        message
      }
    }
  }
`;

module.exports = {
  ADD_COMMENT,
  LOGIN,
  SING_UP,
  LIKE_POST,
  UNLIKE_POST,
  REPLAY_TO_COMMENT,
};
