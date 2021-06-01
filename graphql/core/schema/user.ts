import { objectType, extendType } from "nexus";

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.image();
    t.model.emailVerified();
    t.model.createdAt();
  },
});

const Query = extendType({
  type: "Query",
  definition(t) {
    t.list.field("allUsers", {
      type: "User",
      resolve: async (_root, args, ctx) => {
        console.log("allUsers1", Date.now());
        //const result = await ctx.prisma.user.findMany();
        const result = [
          {
            id: 1,
            name: "styxlab",
            createdAt: new Date(),
          },
        ];
        console.log("allUsers2", Date.now());
        return result;
      },
    });
    t.crud.user();
  },
});

export default [User, Query];
