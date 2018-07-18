import * as React from "react";
import gql from "graphql-tag";
import { graphql, ChildMutateProps } from "react-apollo";
import {
  CreatePollMutation,
  CreatePollMutationVariables
} from "../../schemaTypes";

interface Props {
  children: (
    data: {
      submit: (values: any) => any;
    }
  ) => JSX.Element | null;
}

const createPollMutation = gql`
  mutation CreatePollMutation($name: String!, $options: [String!]!) {
    createPoll(name: $name, options: $options) {
      errors {
        path
        message
      }
      poll {
        id
        name
        options {
          id
          text
          votes
          pollId
        }
      }
    }
  }
`;

class C extends React.PureComponent<
  ChildMutateProps<Props, CreatePollMutation, CreatePollMutationVariables>
> {
  submit = async (values: CreatePollMutationVariables) => {
    const result = await this.props.mutate({
      variables: values
    });

    return result;
  };
  render() {
    return this.props.children({ submit: this.submit });
  }
}

export const NewPollController = graphql<
  Props,
  CreatePollMutation,
  CreatePollMutationVariables
>(createPollMutation)(C);
