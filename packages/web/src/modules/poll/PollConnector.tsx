import * as React from "react";

import { PollView } from "./ui/PollView";
import { RouteComponentProps } from "react-router-dom";

export class PollConnector extends React.PureComponent<
  RouteComponentProps<{ pollId: any }>
> {
  render() {
    return <PollView {...this.props} />;
  }
}
