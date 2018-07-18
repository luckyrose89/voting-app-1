import * as React from "react";
import { NewPollView } from "../newPoll/ui/NewPollView";
import { NewPollController } from "@voting/controller";
import { RouteComponentProps } from "react-router-dom";
export class NewPollConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = (id: number) => {
    this.props.history.push(`/poll/${id}`);
  };
  render() {
    return (
      <NewPollController>
        {({ submit }) => (
          <NewPollView onFinish={this.onFinish} submit={submit} />
        )}
      </NewPollController>
    );
  }
}
