import * as React from "react";
import gql from "graphql-tag";
import { graphql, ChildDataProps } from "react-apollo";
import { AllPollsQuery } from "../../schemaTypes";

const allPollsQuery = gql`
  query AllPollsQuery {
    allPolls {
      id
      name
    }
  }
`;

interface Props {
  render: (allPolls: any) => JSX.Element | null;
}

class C extends React.Component<ChildDataProps<Props, AllPollsQuery>> {
  componentDidMount() {
    this.props.data.refetch();
  }
  render() {
    console.log(this.props.data);
    const { allPolls } = this.props.data;
    console.log(allPolls);
    return <div>{this.props.render({ allPolls })}</div>;
  }
}

export const MainPageController = graphql<Props, AllPollsQuery>(allPollsQuery)(
  C
);
