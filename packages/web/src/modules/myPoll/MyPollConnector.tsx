import * as React from "react";
import { MyPollView } from "./ui/MyPollView";
import { MyPollController } from "@voting/controller";

export class MyPollConnector extends React.PureComponent {
  data = ({ myPoll }: any) => {
    return <MyPollView data={myPoll} />;
  };

  render() {
    return <MyPollController render={this.data} />;
  }
}
