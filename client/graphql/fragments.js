import { gql } from "@apollo/client";

const USER_FIELDS = gql`
  fragment UserFields on User {
    _id
    userName
    email
    followers
    following
    profilePic
    coverPic
    bio
    isVerified
  }
`;

const FILE_FIELDS = gql`
  fragment FileFields on file {
    type
    name
  }
`;

const VERIFY_DATA_FIELDS = gql`
  fragment VerifyDataFields on VerifyData {
    status
    message
  }
`;

const POST_FIELDS = gql`
  ${USER_FIELDS}
  ${FILE_FIELDS}
  fragment PostFields on Post {
    _id
    content
    userInfo {
      ...UserFields
    }
    file {
      ...FileFields
    }
    likesCount
    commentsCount
    liked
  }
`;

const COMMENT_FIELDS = gql`
  ${FILE_FIELDS}
  ${USER_FIELDS}
  fragment CommentFields on comment {
    _id
    userInfo {
      ...UserFields
    }
    content
    file {
      ...FileFields
    }
    likesCount
    repliesCount
  }
`;

const HOME_FIELDS = gql`
  ${USER_FIELDS}
  ${POST_FIELDS}
  fragment HomeFields on home {
    userInfo {
      ...UserFields
    }
    posts {
      ...PostFields
    }
  }
`;

const REPLIES_FIELDS = gql`
  ${FILE_FIELDS}
  ${USER_FIELDS}
  fragment RepliesFields on reply {
    _id
    content
    userInfo {
      ...UserFields
    }
    file {
      ...FileFields
    }
    createdAt
    likesCount
  }
`;

export {
  USER_FIELDS,
  FILE_FIELDS,
  POST_FIELDS,
  COMMENT_FIELDS,
  VERIFY_DATA_FIELDS,
  HOME_FIELDS,
  REPLIES_FIELDS,
};
