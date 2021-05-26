import { nexusPrisma } from "nexus-plugin-prisma";
import { makeSchema, fieldAuthorizePlugin } from "nexus";
import path from "path";

import User from "./schema/user";

// Only generate in development or when the yarn run generate:nexus command is run
// This fixes deployment on Netlify, otherwise you'll run into an EROFS error during building
const shouldGenerateArtifacts =
  process.env.NODE_ENV === "development" || process.env.GENERATE === "true";

export const schema = makeSchema({
  types: [User],
  plugins: [
    nexusPrisma({ shouldGenerateArtifacts, experimentalCRUD: true }),
    fieldAuthorizePlugin(),
  ],
  contextType: {
    module: path.join(process.cwd(), "graphql/context.ts"),
    export: "Context",
  },
  // Generate the files
  shouldGenerateArtifacts,
  outputs: {
    typegen: path.join(process.cwd(), "generated/core/nexus-typegen.ts"),
    schema: path.join(process.cwd(), "generated/core/schema.graphql"),
  },
});
