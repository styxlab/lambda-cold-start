import { ApolloServer } from "apollo-server-micro";

import { schema } from "../../graphql/core/schema";
import { createContext } from "../../graphql/context";

import { IncomingMessage } from "http";
import type { NextApiRequest, NextApiResponse } from "next";

const getRequestOrigin = (req: IncomingMessage) =>
  `${req.headers["x-forwarded-proto"] === `https` ? `https` : `http`}://${
    req.headers.host
  }`;

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 *  Internal GraphQL server on ednpoint /api/graphql
 */

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }) => {
    console.log("before context", Date.now());
    const ctx = createContext("origin");
    console.log("after context", Date.now());
    return ctx;
  },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("start request", Date.now());
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
  console.log("end request", Date.now());
};
