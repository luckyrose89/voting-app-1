/// <reference types="node" />
import { createConnection, getConnectionOptions } from "typeorm";

export const createTyperomConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  (await process.env.NODE_ENV) === "production"
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        name: "default"
      } as any)
    : await createConnection({ ...connectionOptions, name: "default" });
};
