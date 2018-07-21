/// <reference types="node" />
import { createConnection, getConnectionOptions } from "typeorm";
import { User } from "../entity/User";
import { Poll } from "../entity/Poll";
import { PollOption } from "../entity/PollOption";

export const createTyperomConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  (await process.env.NODE_ENV) === "production"
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        entities:[User,Poll,PollOption],
        name: "default"
      } as any)
    : await createConnection({ ...connectionOptions, name: "default" });
};
