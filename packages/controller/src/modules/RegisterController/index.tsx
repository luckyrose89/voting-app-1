import * as React from "react";
import gql from "graphql-tag";
import { graphql, ChildMutateProps } from "react-apollo";
import { RegisterMutation, RegisterMutationVariables } from "../../schemaTypes";
import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";
import { normalizeErrors } from "../../utils/normalizeError";
interface Props {
  children: (
    data: {
      submit: (
        values: RegisterMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
}

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;

class C extends React.PureComponent<
  ChildMutateProps<Props, RegisterMutation, RegisterMutationVariables>
> {
  submit = async (values: RegisterMutationVariables) => {
    const {
      data: { register }
    } = await this.props.mutate({
      variables: values
    });

    if (register) {
      return normalizeErrors(register);
    }
    return null;
  };
  render() {
    return this.props.children({ submit: this.submit });
  }
}

export const RegisterController = graphql<
  Props,
  RegisterMutation,
  RegisterMutationVariables
>(registerMutation)(C);
