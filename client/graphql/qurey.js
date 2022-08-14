import { gql } from "@apollo/client";
import {
  POST_FIELDS,
  HOME_FIELDS,
  VERIFY_DATA_FIELDS,
  COMMENT_FIELDS,
  USER_FIELDS,
  FILE_FIELDS,
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

const HomeQuery = gql`
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
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      ... on Post {
        ...PostFields
        userInfo {
          ...UserFields
        }
        comments{
          _id
          content
          file {
            ...FileFields
          }
          likesCount
          userInfo{
            ...UserFields
            }
        }
      
      }
      ... on Error {
        message
      }
    }
  }
`;

export { verifyEmailQuery, verifyUserNamesQuery, HomeQuery, GET_POST };
