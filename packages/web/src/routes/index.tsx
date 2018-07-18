import * as React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps
} from "react-router-dom";
import { graphql, ChildDataProps } from "react-apollo";
import gql from "graphql-tag";
import { LoginConnector } from "../modules/login/LoginConnector";
import { MainPageConnector } from "../modules/mainPage/MainPageConnector";
import { RegisterConnector } from "../modules/register/RegisterConnector";
import { NewPollConnector } from "../modules/newPoll/NewPollConnector";
import { PollConnector } from "../modules/poll/PollConnector";
import { MyPollConnector } from "../modules/myPoll/MyPollConnector";
type RouteComponent =
  | React.SFC<RouteComponentProps<{}>>
  | React.ComponentClass<any>;

const authentication = gql`
  query {
    authentication
  }
`;

export let authorization = false;

const AUTHENTICATED = (data: any) => {
  return data.authentication;
};

const C: React.SFC<ChildDataProps<RouteProps>> = ({
  component,
  data,
  ...rest
}) => {
  const renderFn = (Component?: RouteComponent) => (props: RouteProps) => {
    if (!Component) {
      return null;
    }

    if (data.loading) {
      return null;
    }

    if (AUTHENTICATED(data)) {
      authorization = true;
      return <Component {...props} />;
    }
    authorization = false;
    return <Redirect to="/" />;
  };

  return <Route {...rest} render={renderFn(component)} />;
};

export const PrivateRoute = graphql<RouteProps>(authentication)(C);

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/login" component={LoginConnector} />
      <Route exact={true} path="/" component={MainPageConnector} />
      <PrivateRoute exact={true} path="/newpoll" component={NewPollConnector} />
      <Route exact={true} path="/poll/:pollId" component={PollConnector} />
      <PrivateRoute exact={true} path="/mypoll" component={MyPollConnector} />
    </Switch>
  </BrowserRouter>
);
