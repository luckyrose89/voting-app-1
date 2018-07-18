import * as React from "react";
import { client } from "./apollo";
import { ApolloProvider } from "react-apollo";
import { Routes } from "./routes";
export default class App extends React.PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    );
  }
}
