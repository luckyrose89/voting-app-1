import * as React from "react";
import gql from "graphql-tag";
import { graphql, ChildDataProps } from "react-apollo";
import { MyPollQuery } from "../../schemaTypes";

interface Props {
  render: (allPolls: any) => JSX.Element | null;
}
class C extends React.PureComponent<ChildDataProps<Props, MyPollQuery>> {
  componentDidMount() {
    this.props.data.refetch();
  }

  render() {
    const { myPoll } = this.props.data;
    return <div>{this.props.render({ myPoll })}</div>;
  }
}

const myPollQuery = gql`
  query MyPollQuery {
    myPoll {
      id
      name
    }
  }
`;

export const MyPollController = graphql<Props, MyPollQuery>(myPollQuery)(C);
