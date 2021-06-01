import { Context } from "nexus-plugin-prisma/typegen";

interface ConnectedUser {
  data?: {
    user?: {
      connect?: {
        id?: number;
      };
    };
  };
}

export const connectUser = <T extends ConnectedUser>(args: T, ctx: Context) => {
  args.data.user = {
    ...args.data.user,
    connect: { id: ctx.user.id },
  };
  return args;
};

interface WhereUser {
  where: {
    id_userId?: {
      id: string;
      userId: number;
    };
  };
}

export const whereUser = <T extends WhereUser>(args: T, ctx: Context) => {
  args.where.id_userId = {
    ...args.where.id_userId,
    userId: ctx.user.id,
  };
  return args;
};
