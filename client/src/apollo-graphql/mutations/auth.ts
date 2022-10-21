import { gql } from '@apollo/client';

// export const signInWithEmail = (email: string, password: string) => gql`
//   mutation signInUser(input: {${email}, ${password}}){
//       isAuthenticated
//       token
//       user {
//         displayName
//         _id
//         email
//         firstName
//         lastName
//       }
//   }
// `;

export const SIGN_IN_USER_MUTATION = gql`
  mutation SignInUser($email: String!, $password: String!) {
    signInUser(input: {email: $email, password: $password}) {
      isAuthenticated
      token
      user {
        displayName
        _id
        email
        firstName
        lastName
      }
    }
  }
`;
