import * as React from "react";
import { NavBar } from "../../shared/NavBar";
import { ListData } from "./ListData";
import { Layout } from "antd";
const { Content } = Layout;

interface Props {
  data: any;
}

export class MainPage extends React.PureComponent<Props> {
  render() {
    return (
      <Layout>
        <NavBar />
        <Content>
          <div style={{ textAlign: "center" }}>
            <h1>fcc-voting</h1>
            <h2>
              <div>Below are polls hosted by fcc-voting. </div>Select a poll to
              see the results and vote, or sign-in to make a new poll.
            </h2>
          </div>
          <div style={{ margin: "auto", width: 700, marginBottom: 5 }}>
            <ListData data={this.props.data} />
          </div>
        </Content>
      </Layout>
    );
  }
}
