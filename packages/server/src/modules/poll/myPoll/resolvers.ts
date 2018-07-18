import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";

export const resolvers: ResolverMap = {
  Query: {
    myPoll: async (_, __, { session }) => {
      if (!session || !session.userId) {
        return null;
      }

      const user = await User.find({
        where: { id: session.userId },
        relations: ["polls"]
      });
      console.log(user[0].polls);
      return user[0].polls;
    }
  }
};
