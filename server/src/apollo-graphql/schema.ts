import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date

  type User {
    _id: String
    displayName: String!
    firstName: String!
    lastName: String!
    createdAt: Date!
    email: String!
  }

  type AuthenticationPayload {
    isAuthenticated: Boolean!
    token: String!
    user: User
  }

  input UserDetails {
    displayName: String
    firstName: String!
    lastName: String!
    createdAt: Date
    email: String
    password: String
  }

  input UserCredentials {
    email: String!
    password: String!
  }

  input Email {
    email: String!
  }

  type Query {
    getUserByEmail(input: Email): User
  }

  type Mutation {
    createUser(input: UserDetails): AuthenticationPayload!
    signInUser(input: UserCredentials): AuthenticationPayload!
    signOutUser: AuthenticationPayload!
  }
`;

export default typeDefs;
