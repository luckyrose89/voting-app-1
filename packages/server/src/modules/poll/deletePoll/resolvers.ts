import { ResolverMap } from "../../../types/graphql-utils";
import { Poll } from "../../../entity/Poll";

export const resolvers: ResolverMap = {
  Mutation: {
    deletePoll: async (_, { id }, { session }) => {
      if (!session || !session.userId) {
        return false;
      }
      const poll = await Poll.findOne({ where: { id } });
      if (!poll) {
        throw new Error("does not exist");
      }
      await Poll.remove(poll);

      return true;
    }
  }
};
