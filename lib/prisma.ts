import { PrismaClient } from "@prisma/client";

/**
 *
 * Prevent to many open clients due to hot reloading
 *
 */

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();

  // https://www.prisma.io/docs/concepts/components/prisma-client/middleware/logging-middleware/
  prisma.$use(async (params, next) => {
    const before = Date.now();

    const result = await next(params);

    const after = Date.now();

    console.log(
      `Query ${params.model}.${params.action} took ${after - before}ms`
    );

    return result;
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
