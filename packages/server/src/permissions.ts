import { rule, shield, and } from "graphql-shield";

const isAuthenticated = rule()(async (_, __, ctx) => {
  if (!ctx.session || !ctx.session.userId) {
    throw new Error();
  }
  return ctx.session !== null || ctx.session.userId !== null;
});

export const permissions = shield({
  Query: {
    me: and(isAuthenticated)
  }
});
