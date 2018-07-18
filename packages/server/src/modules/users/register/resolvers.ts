import { GQL } from "../../../types/schema";
import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { validUserSchema } from "../../../../../common/dist";
import { formatYupErrors } from "../../../utils/formatYupErrors";
import { duplicateEmail } from "./errorMessages";
export const resolvers: ResolverMap = {
  Query: {
    hello: () => "hiasf"
  },
  Mutation: {
    register: async (_, args: GQL.IRegisterOnMutationArguments) => {
      try {
        await validUserSchema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupErrors(err);
      }

      const { email, password } = args;
      const userAlreadyExists = await User.findOne({
        where: { email }
      });

      if (userAlreadyExists) {
        return [
          {
            path: "email",
            message: duplicateEmail
          }
        ];
      }

      const user = await User.create({ email, password });

      await user.save();
      return null;
    }
  }
};
