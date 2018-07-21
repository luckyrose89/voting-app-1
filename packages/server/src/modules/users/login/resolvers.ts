import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import * as bcrypt from "bcryptjs";
import { GQL } from "../../../types/schema";
import { invalidLogin } from "./errorMessages";

const errorResponse = [
  {
    path: "email",
    message: invalidLogin
  }
];
export const resolvers: ResolverMap = {
  Mutation: {
    login: async (
      _,
      { email, password }: GQL.ILoginOnMutationArguments,
      { session, req }
    ) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return {
          errors: errorResponse
        };
      }
      if (!user.password) {
        return {
          errors: errorResponse
        };
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return {
          errors: errorResponse
        };
      }
      session.userId = user.id;
      return {
        sessionId: req.sessionID
      };
    }
  }
};
