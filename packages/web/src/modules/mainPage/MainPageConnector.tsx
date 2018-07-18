import * as React from "react";
import { MainPage } from "./ui/MainPage";
import { MainPageController } from "@voting/controller";

export class MainPageConnector extends React.PureComponent {
  passData = ({ allPolls }: any) => <MainPage data={allPolls} />;

  render() {
    return (
      <MainPageController render={this.passData} />

      // <MainPageController
      // // tslint:disable-next-line:jsx-no-lambda
      //   render={({ allPolls }) => <MainPage data={allPolls} />}
      // />
    );
  }
}
