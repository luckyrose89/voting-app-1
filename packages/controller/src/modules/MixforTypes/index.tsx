import gql from "graphql-tag";

export const pollquery = gql`
  query PollQuery($id: Int!) {
    poll(id: $id) {
      id
      name
      userId
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
