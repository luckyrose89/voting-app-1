import "reflect-metadata";
// tslint:disable-next-line:no-var-requires
require("dotenv").config();
import { createConnection } from "typeorm";
import * as Redis from "ioredis";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as RateLimit from "express-rate-limit";
import * as RateLimitRedisStore from "rate-limit-redis";
import { GraphQLServer } from "graphql-yoga";
import { genSchema } from "./utils/genSchema";
import * as passport from "passport";
import { Strategy } from "passport-twitter";
import { permissions } from "./permissions";
import { User } from "./entity/User";

const SESSION_SECRET = "asdfadfafafashgf";
const redis = new Redis();
const RedisStore = connectRedis(session);

// cors
const cors = {
  credentials: true,
  origin: process.env.FRONTEND_HOST
};
// constext here

const server = new GraphQLServer({
  schema: genSchema() as any,
  context: ({ request }) => ({
    session: request.session,
    req: request
  }),
  middlewares: [permissions]
});
// cookie

server.express.use(
  session({
    store: new RedisStore({
      client: redis as any
    }),
    name: "qid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
);
// rate limiter

server.express.use(
  new RateLimit({
    store: new RateLimitRedisStore({
      client: redis
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
  })
);
// twitter api
passport.use(
  new Strategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
      callbackURL: `http://localhost:4000/auth/twitter/callback`,
      includeEmail: true
    },
    async (_, __, profile, cb) => {
      const { id, emails } = profile;
      let user;
      let email;
      if (emails) {
        email = emails[0].value;
        user = await User.findOne({ where: { twitterId: id } });
        if (!user) {
          user = await User.findOne({ where: { email } });
        }
      }

      if (!user) {
        user = await User.create({
          twitterId: id,
          email
        }).save();
      } else if (!user.twitterId) {
        user.twitterId = id;
        await user.save();
      }
      // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });

      return cb(null, { id: user.id });
    }
  )
);

server.express.use(passport.initialize());

server.express.get("/auth/twitter", passport.authenticate("twitter"));

server.express.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    session: false
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    (req.session as any).userId = (req.user as any).id;
    res.redirect(`${process.env.FRONTEND_HOST}/success`);
  }
);
// twitter end

// server start
createConnection()
  .then(async () => {
    server.start({ cors }, () =>
      console.log("Server is running on localhost:4000")
    );
  })
  .catch(error => console.log(error));
