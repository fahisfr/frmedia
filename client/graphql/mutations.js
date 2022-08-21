import { gql, useMutation } from "@apollo/client";


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

const LIKE_COMMENT = gql`
  mutation likeComment($postId: ID!, $commentId: ID!) {
    likeComment(postId: $postId, commentId: $commentId) {
      ... on Success {
        message
      }
      ... on Error {
        message
      }
    }
  }
`;

const UNLIKE_COMMENT = gql`
  mutation unlikeComment($postId: ID!, $commentId: ID!) {
    unLikeComment(postId: $postId, commentId: $commentId) {
      ... on Success {
        message
      }
      ... on Error {
        message
      }
    }
  }
`;

const LIKE_REPLY = gql`
  mutation likeReply($postId: ID!, $commentId: ID!, $replyId: ID!) {
    likeReply(postId: $postId, commentId: $commentId, replyId: $replyId) {
      ... on Success {
        message
      }
      ... on Error {
        message
      }
    }
  }
`;
const UNLIKE_REPLY = gql`
  mutation unlikeReply($postId: ID!, $commentId: ID!, $replyId: ID!) {
    unLikeReply(postId: $postId, commentId: $commentId, replyId: $replyId) {
      ... on Success {
        message
      }
      ... on Error {
        message
      }
    }
  }
`;

const FOLLOW = gql`
  mutation follow($followId:ID!) {
    follow(followId: $followId) {
      ... on Success {
        message
      }
      ... on Error {
        message
      }
    }
  }
`;



const UNFOLLOW = gql`
  mutation unfollow($userName: String!) {
    unFollow(userName: $userName) {
      ... on Success {
        message
      }
      ... on Error {
        message
      }
    }
  }
`

module.exports = {
  ADD_COMMENT,
  LOGIN,
  SING_UP,
  LIKE_POST,
  UNLIKE_POST,
  REPLAY_TO_COMMENT,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  LIKE_REPLY,
  UNLIKE_REPLY,
  FOLLOW,
  UNFOLLOW,
};
