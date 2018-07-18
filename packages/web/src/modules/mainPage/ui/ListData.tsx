import * as React from "react";
import { List } from "antd";
import { Link } from "react-router-dom";

interface Props {
  data: any;
}

const listItems = (item: any) => (
  <List.Item style={{ background: "white" }}>
    <List.Item.Meta
      style={{ textAlign: "center" }}
      title={<Link to={`/poll/${item.id}`}> {item.name} </Link>}
    />
  </List.Item>
);

export class ListData extends React.PureComponent<Props> {
  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.data}
        renderItem={listItems}
      />
    );
  }
}
