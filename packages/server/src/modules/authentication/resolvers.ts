import { ResolverMap } from "../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    authentication: (_, __, { session }) => {
      if (!session || !session.userId) {
        return false;
      } else if (session.userId) {
        return true;
      }
      return false;
    }
  }
};
