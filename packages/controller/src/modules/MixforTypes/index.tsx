import gql from "graphql-tag";

export const pollquery = gql`
  query PollQuery($id: Int!) {
    poll(id: $id) {
      id
      name
      options {
        id
        text
        votes
      }
    }
  }
`;

export const logoutMutation = gql`
  mutation LogoutMutation {
    logout
  }
`;
