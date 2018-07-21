import * as React from "react";
import { LoginView } from "./ui/LoginView";
import { LoginController } from "@voting/controller";
import { RouteComponentProps } from "react-router-dom";
import { withApollo, WithApolloClient } from "react-apollo";
import { ApolloClient } from "apollo-client";

interface MyAppProps {
  client: ApolloClient<any>;
}
type MyAppPropsInternal = WithApolloClient<MyAppProps>;

class C extends React.PureComponent<
  MyAppPropsInternal & RouteComponentProps<{}>
> {
  onFinish = async () => {
    await this.props.client.resetStore();
    this.props.history.push("/newpoll");
  };
  render() {
    return (
      <LoginController>
        {({ submit }) => <LoginView submit={submit} onFinish={this.onFinish} />}
      </LoginController>
    );
  }
}

export const LoginConnector = withApollo<{}, {}>(C);
