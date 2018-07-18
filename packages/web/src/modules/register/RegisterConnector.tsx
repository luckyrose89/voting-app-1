import * as React from "react";
import { RegisterView } from "./ui/RegisterView";
import { RegisterController } from "@voting/controller";
import { RouteComponentProps } from "react-router-dom";

export class RegisterConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <RegisterController>
        {({ submit }) => (
          <RegisterView submit={submit} onFinish={this.onFinish} />
        )}
      </RegisterController>
    );
  }
}
