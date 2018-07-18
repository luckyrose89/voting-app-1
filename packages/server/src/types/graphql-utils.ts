export type Resolver = (
  parent: any,
  args: any,
  context: { session: Session; req: Express.Request },
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
