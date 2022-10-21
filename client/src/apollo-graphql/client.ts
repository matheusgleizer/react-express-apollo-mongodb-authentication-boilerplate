import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:7070/graphql',
  cache: new InMemoryCache(),
  headers: {
    contentType: 'application/graphql',
  },
});
