

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login_errors {
  path: string;
  message: string;
}

export interface LoginMutation_login {
  errors: LoginMutation_login_errors[] | null;
  sessionId: string | null;
}

export interface LoginMutation {
  login: LoginMutation_login;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllPollsQuery
// ====================================================

export interface AllPollsQuery_allPolls {
  id: number;
  name: string;
}

export interface AllPollsQuery {
  allPolls: AllPollsQuery_allPolls[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyPollQuery
// ====================================================

export interface MyPollQuery_myPoll {
  id: number;
  name: string;
}

export interface MyPollQuery {
  myPoll: MyPollQuery_myPoll[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePollMutation
// ====================================================

export interface CreatePollMutation_createPoll_errors {
  path: string;
  message: string;
}

export interface CreatePollMutation_createPoll_poll_options {
  id: number;
  text: string;
  votes: number;
  pollId: number;
}

export interface CreatePollMutation_createPoll_poll {
  id: number;
  name: string;
  options: CreatePollMutation_createPoll_poll_options[];
}

export interface CreatePollMutation_createPoll {
  errors: CreatePollMutation_createPoll_errors[] | null;
  poll: CreatePollMutation_createPoll_poll | null;
}

export interface CreatePollMutation {
  createPoll: CreatePollMutation_createPoll;
}

export interface CreatePollMutationVariables {
  name: string;
  options: string[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PollQuery
// ====================================================

export interface PollQuery_poll_options {
  id: number;
  text: string;
  votes: number;
}

export interface PollQuery_poll {
  id: number;
  name: string;
  options: PollQuery_poll_options[];
}

export interface PollQuery {
  poll: PollQuery_poll[];
}

export interface PollQueryVariables {
  id: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LogoutMutation
// ====================================================

export interface LogoutMutation {
  logout: boolean | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterMutation
// ====================================================

export interface RegisterMutation_register {
  path: string;
  message: string;
}

export interface RegisterMutation {
  register: RegisterMutation_register[] | null;
}

export interface RegisterMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================