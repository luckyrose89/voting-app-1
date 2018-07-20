import { Redis } from "ioredis";
import { Request } from "express";

export type Resolver = (
  parent: any,
  args: any,
  context: { session: Session; req: Request; redis: Redis },
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}

export interface Session extends Express.Session {
  userId?: string;
}
