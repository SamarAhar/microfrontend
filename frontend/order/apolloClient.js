import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const userClient = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8080/users/graphql',
  }),
  cache: new InMemoryCache(),
});

const productClient = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8080/products/graphql',
  }),
  cache: new InMemoryCache(),
});

export default {userClient, productClient};
