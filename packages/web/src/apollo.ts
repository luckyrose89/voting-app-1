import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const link = new HttpLink({
  uri: process.env.REACT_APP_SERVER_URL,
  credentials: "include"
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
