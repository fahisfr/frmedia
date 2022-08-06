import { gql } from "@apollo/client";

const verifyUserNamesQuery = gql`
  query verifyUserName($userName: String!) {
    verifyUserName(userName: $userName) {
      status
      message
    }
  }
`;

const verifyEmailQuery = gql`
  query vrifyEmail($email: String!) {
    verifyEmail(email: $email) {
      approved
      message
    }
  }
`;

const HomeQuery = gql`
  query home {
    home {
      userInfo {
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
      posts {
        _id
        userInfo {
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
        content
        file {
          type
          name
        }
        likes
        postAt
        editedAt
      }
    }
  }
`;

export { verifyEmailQuery, verifyUserNamesQuery, HomeQuery };
