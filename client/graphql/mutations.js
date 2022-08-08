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
      userName
      email
      followers
      following
      profilePic
      coverPic
      bio
      isVerified
    }
  }
`;

const SING_UP = gql`
  mutation signUp($userName: String!, $email: String!, $password: String!) {
    signUp(userName: $userName, email: $email, password: $password) {
      userName
      email
      followers
      following
      profilePic
      coverPic
      bio
      isVerified
    }
  }
`;

const ADD_POST = gql`
  mutation addPost($post: String, $file: FileUpload) {
    addPost(post: $post, file: $file) {
      post
      file
    }
  }
`;



module.exports = {
  ADD_COMMENT,
  LOGIN,
  SING_UP,
}
