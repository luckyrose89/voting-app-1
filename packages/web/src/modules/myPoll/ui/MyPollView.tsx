import * as React from "react";
import { Layout } from "antd";
import { NavBar } from "../../shared/NavBar";
import { ListData } from "../../mainPage/ui/ListData";
const { Content } = Layout;

interface Props {
  data: any;
}

export class MyPollView extends React.PureComponent<Props> {
  render() {
    return (
      <Layout>
        <NavBar />
        <Content>
          <div style={{ textAlign: "center" }}>
            <h1>My created Polls</h1>
          </div>
          <div style={{ margin: "auto", width: 700, marginBottom: 5 }}>
            <ListData data={this.props.data} />
          </div>
        </Content>
      </Layout>
    );
  }
}
