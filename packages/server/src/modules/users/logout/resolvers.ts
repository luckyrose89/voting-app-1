import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    logout: (_, __, { session }) =>
      new Promise(res =>
        session.destroy((err: any) => {
          if (err) {
            console.log("logout error: ", err);
          }

          res(true);
        })
      )
  }
};
