// tslint:disable
// graphql typescript definitions

export declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: "Query";
    poll: Array<IPoll>;
    allPolls: Array<IPoll>;
    me: IUser | null;
    hello: string;
  }

  interface IPollOnQueryArguments {
    id: number;
  }

  interface IPoll {
    __typename: "Poll";
    id: number;
    name: string;
    options: Array<IPollOption>;
  }

  interface IPollOption {
    __typename: "PollOption";
    id: number;
    text: string;
    votes: number;
    pollId: number;
  }

  interface IUser {
    __typename: "User";
    id: string;
    email: string;
  }

  interface IMutation {
    __typename: "Mutation";
    createPoll: IPollResponse;
    vote: boolean;
    login: ILoginResponse;
    register: Array<IError>;
  }

  interface ICreatePollOnMutationArguments {
    name: string;
    options: Array<string>;
    userId: string;
  }

  interface IVoteOnMutationArguments {
    pollOptionId: number;
  }

  interface ILoginOnMutationArguments {
    email: string;
    password: string;
  }

  interface IRegisterOnMutationArguments {
    email: string;
    password: string;
  }

  interface IPollResponse {
    __typename: "PollResponse";
    errors: Array<IError>;
    poll: IPoll | null;
  }

  interface IError {
    __typename: "Error";
    path: string;
    message: string;
  }

  interface ILoginResponse {
    __typename: "LoginResponse";
    errors: Array<IError>;
    sessionId: string | null;
  }
}

// tslint:enable
