import "../styles/globals.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { ApolloLink } from "apollo-link";
import React from "react";

function MyApp({ Component, pageProps }) {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  });

  const authMiddleware = new ApolloLink((operation, forward,) => {
    operation.setContext({
      headers: {
        authorization: localStorage.getItem("auth_token") || null,
      },
    });

  
    return forward(operation);
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authMiddleware.concat(httpLink),
  });

  const getLayout = Component.PageLayout || ((page) => page);

  return (
    <ApolloProvider client={client}>
      {getLayout(<Component {...pageProps} />)}
    </ApolloProvider>
  );
}

export default MyApp;
