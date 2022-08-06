import { gql, useMutation } from "@apollo/client";


const loginMutation = gql`
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

const signUpMutation = gql`
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

const addPostMutation = gql`
  mutation addPost($post: String, $file: FileUpload) {
    addPost(post: $post, file: $file) {
      post
      file
    }
  }
`;

const addPostRequest = (post, file) => {
  
  const [addPostNow, { data, error, loading }] = useMutation(addPostMutation, {
    variables: {
      post,
      file,
    },
  });

  return [addPostNow, { data, error, loading }];
};

const loginrRequest = (nameOrEmail, password) => {
  const [loginNow, { data, error, loading }] = useMutation(loginMutation, {
    variables: {
      nameOrEmail,
      password,
    },
  });

  return [loginNow, { data, error, loading }];
};

const singUpRequest = (userName, email, password) => {
  const [singUpNow, { data, error, loading }] = useMutation(signUpMutation, {
    variables: {
      userName,
      email,
      password,
    },
  });

  return [singUpNow, { data, error, loading }];
};

module.exports = { loginrRequest, singUpRequest, addPostRequest };
