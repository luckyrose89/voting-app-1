import { ResolverMap } from "../../../types/graphql-utils";
import { Poll } from "../../../entity/Poll";
import { PollOption } from "../../../entity/PollOption";
import { GQL } from "../../../types/schema";
import { unauthorisedError } from "../../shared/unauthorizedError";
import { User } from "../../../entity/User";
import { getRepository } from "typeorm";
import { pollOptionIdPrefix } from "../../../utils/constants";

interface KeyValuePair {
  [key: string]: any;
}

export const resolvers: ResolverMap = {
  Query: {
    allPolls: async () => {
      // const result = await Poll.find({ relations: ["options"] });
      // return result;
      const result = await getRepository(Poll)
        .createQueryBuilder("poll")
        .leftJoinAndSelect("poll.options", "poll_option")
        .orderBy("poll.name", "ASC")
        .getMany();
      return result;
    },
    poll: async (_, { id }) => {
      const result = await Poll.find({ where: { id }, relations: ["options"] });
      return result;
    }
  },
  Mutation: {
    createPoll: async (
      _,
      { name, options }: GQL.ICreatePollOnMutationArguments,
      { session }
    ) => {
      console.log("here");
      console.log(session.userId);
      if (!session.userId) {
        return {
          errors: unauthorisedError
        };
      }

      const check = await User.findOne({ where: { id: session.userId } });

      if (!check) {
        return {
          errors: unauthorisedError
        };
      }

      const poll = await Poll.create({
        name,
        userId: session.userId as any
      });
      await poll.save();
      let pollOptions: KeyValuePair = {};

      await Promise.all(
        options.map(async (x: any) => {
          pollOptions = await PollOption.create({
            text: x,
            votes: 0,
            poll: poll.id as any
          });

          await pollOptions.save();
        })
      );

      if (!pollOptions) {
        return {
          errors: {
            path: "Error",
            message: "Unexpected Error"
          }
        };
      }

      return {
        poll: {
          id: poll.id,
          name: poll.name,
          options: [
            {
              id: pollOptions.id,
              text: pollOptions.text,
              votes: pollOptions.votes,
              pollId: pollOptions.poll
            }
          ]
        }
      };
    },
    vote: async (
      _,
      { pollOptionId }: GQL.IVoteOnMutationArguments,
      { req, redis }
    ) => {
      const pollOption = await PollOption.findOne({
        where: { id: pollOptionId }
      });
      console.log(pollOption);
      if (!pollOption) {
        return false;
      }

      const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
      console.log("my ip is ");
      console.log(ip);
      if (ip) {
        const hasIp = await redis.sismember(
          `${pollOptionIdPrefix}${pollOptionId}`,
          ip
        );
        console.log(hasIp);
        if (hasIp) {
          return false;
        }
      }

      await PollOption.update(
        { id: pollOptionId },
        { votes: pollOption.votes + 1 }
      );
      await redis.sadd(`${pollOptionIdPrefix}${pollOptionId}`, ip);

      return true;
    }
  }
};
