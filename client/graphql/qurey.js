import { gql, useLazyQuery } from "@apollo/client";

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



export { verifyEmailQuery, verifyUserNamesQuery };
