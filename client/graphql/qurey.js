import { gql } from "@apollo/client";
import {
  POST_FIELDS,
  HOME_FIELDS,
  VERIFY_DATA_FIELDS,
  COMMENT_FIELDS,
  USER_FIELDS,
  FILE_FIELDS,
  REPLIES_FIELDS,
} from "../graphql/fragments";

const verifyUserNamesQuery = gql`
  ${VERIFY_DATA_FIELDS}
  query verifyUserName($userName: String!) {
    verifyUserName(userName: $userName) {
      ... on VerifyData {
        ...VerifyDataFields
        
      }
      ... on Error {
        message
      }
    }
  }
`;

const verifyEmailQuery = gql`
  query vrifyEmail($email: String!) {
    verifyEmail(email: $email) {
      ... on VerifyData {
        status
        message
      }
      ... on Error {
        message
      }
    }
  }
`;

const HOME = gql`
  ${HOME_FIELDS}
  query home {
    home {
      ... on home {
        ...HomeFields
      }
      ... on Error {
        message
      }
    }
  }
`;

const GET_POST = gql`
  ${POST_FIELDS}
  ${USER_FIELDS}
  ${FILE_FIELDS}
  ${COMMENT_FIELDS}
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      ... on Post {
        ...PostFields
        userInfo {
          ...UserFields
        }
        comments {
          ...CommentFields
        }
      }
      ... on Error {
        message
      }
    }
  }
`;

const GET_RPEPLIES = gql`
  ${REPLIES_FIELDS}
  query getReplies($postId: ID!, $commentId: ID!) {
    getCommentReplies(postId: $postId, commentId: $commentId) {
      ... on replies {
        replies {
          ...RepliesFields
        }
      }
      ... on Error {
        message
      }
    }
  }
`;

const GET_USERINFO = gql`
  ${USER_FIELDS}
  query getUserInfo($userName:String!) {
    getUserInfo(userName: $userName) {
      ... on User {
        ...UserFields
      }
      ... on Error {
        message
      }
    }
  }
`;

export {
  verifyEmailQuery,
  verifyUserNamesQuery,
  HOME,
  GET_POST,
  GET_RPEPLIES,
  GET_USERINFO
};
