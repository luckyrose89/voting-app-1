import { ResolverMap } from "../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    authentication: (_, __, { session }) => {
      if (!session || !session.userId) {
        return {
          access: false
        };
      } else if (session.userId) {
        return {
          access: true,
          userId: session.userId
        };
      }
      return {
        access: false
      };
    }
  }
};
