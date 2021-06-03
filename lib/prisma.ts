import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

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

export default prisma;
