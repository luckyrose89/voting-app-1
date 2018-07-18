import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";

export const resolvers: ResolverMap = {
  Query: {
    me: (_, __) =>
      User.findOne({ where: { id: "55f2c3a3-7ea5-405b-ab51-d7812f478c7d" } })
  }
};
