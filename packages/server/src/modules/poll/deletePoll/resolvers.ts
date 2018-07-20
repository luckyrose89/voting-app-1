import { ResolverMap } from "../../../types/graphql-utils";
import { Poll } from "../../../entity/Poll";
import { pollIdPrefix } from "../../../utils/constants";

export const resolvers: ResolverMap = {
  Mutation: {
    deletePoll: async (_, { id }, { session, redis, req }) => {
      if (!session || !session.userId) {
        return false;
      }

      const poll = await Poll.findOne({ where: { id } });
      if (!poll) {
        throw new Error("does not exist");
      }
      const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

      await Poll.remove(poll);

      await redis.srem(`${pollIdPrefix}${id}`, ip);

      return true;
    }
  }
};
