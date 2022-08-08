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
      }
    }
  }
`;


const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      _id
      userInfo {
        _id
        userName
        profilePic
      }
      content
      file {
        type
        name
      }
      comments {
        content
        likes
        file {
          type
          name
        }
        commentAt
        userInfo {
          _id
          userName
          profilePic
          
        }
      }

      likes
      postAt
    }
  }
`;

export { verifyEmailQuery, verifyUserNamesQuery, HomeQuery, GET_POST };
