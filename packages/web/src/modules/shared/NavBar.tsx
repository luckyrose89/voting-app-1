import * as React from "react";
import { Menu } from "antd";
import { authorization } from "../../routes";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { withApollo, WithApolloClient } from "react-apollo";
import { ApolloClient } from "apollo-client";

interface MyAppProps {
  client: ApolloClient<any>;
}
type MyAppPropsInternal = WithApolloClient<MyAppProps>;

class C extends React.PureComponent<MyAppPropsInternal> {
  render() {
    return (
      <div>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link to="/">Fcc Voting</Link>
          </Menu.Item>

          {authorization ? (
            <Menu.Item style={{ float: "right" }}>
              <a
                onClick={
                  // tslint:disable-next-line:jsx-no-lambda
                  async () => {
                    const { client } = this.props;
                    await client.mutate({
                      mutation: logoutMutation
                    });
                    await client.resetStore();
                  }
                }
              >
                SignOUt
              </a>
            </Menu.Item>
          ) : (
            <Menu.Item style={{ float: "right" }}>
              <Link to="/login">Login</Link>
            </Menu.Item>
          )}
          {!authorization && (
            <Menu.Item style={{ float: "right" }}>
              <Link to="/register">Signup</Link>
            </Menu.Item>
          )}
          {authorization && (
            <Menu.Item style={{ float: "right" }}>
              <Link to="/newpoll">CreatePoll</Link>
            </Menu.Item>
          )}
          {authorization && (
            <Menu.Item style={{ float: "right" }}>
              <Link to="/mypoll">MyPoll</Link>
            </Menu.Item>
          )}
        </Menu>
      </div>
    );
  }
}

const logoutMutation = gql`
  mutation {
    logout
  }
`;

export const NavBar = withApollo<{}, {}>(C);
