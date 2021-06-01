import { objectType, extendType } from "nexus";
import { whereUser } from "../../args";

// https://github.com/graphql-nexus/nexus-plugin-prisma/issues/600
// https://www.prisma.io/docs/concepts/components/prisma-client/crud#read

const Post = objectType({
  name: "Post",
  definition(t) {
    t.model.id();
    t.model.slug();
    t.model.title();
    t.model.editordoc();
    t.model.html();
    t.model.excerpt();
    t.model.tags();
    t.model.authors();
    t.model.docCount();
    t.model.user();
    t.model.userId();
    t.model.projectId();
    t.model.published();
    t.model.publishedAt();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Query = extendType({
  type: "Query",
  definition(t) {
    t.list.field("allPosts", {
      type: "Post",
      resolve: async (_parent, _args, ctx) => {
        //if (ctx.auth === 'bearer') return null
        console.time("allPosts");
        //const result = await ctx.prisma.post.findMany({
        //  where: { userId: 1 },
        //  orderBy: { updatedAt: "desc" },
        //});
        const result = [
          {
            id: "asd",
            title: "styxlab",
            userId: 1,
            docCount: 1,
            published: true,
            projectId: "asda",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
        console.timeEnd("allPosts");
        return result;
      },
    });
    t.nullable.crud.post({
      resolve: async (root, args, ctx, info, originalResolve) => {
        if (!ctx.user?.id) return null;
        args = whereUser<typeof args>(args, ctx);
        //console.log(args)
        return await originalResolve(root, args, ctx, info);
      },
    });
  },
});

export default [Post, Query];
