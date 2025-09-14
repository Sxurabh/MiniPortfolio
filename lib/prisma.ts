// sxurabh/miniportfolio/MiniPortfolio-ExperimentalBranch/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Declare a global variable to hold the Prisma client instance.
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a single instance of the Prisma client and reuse it.
// This prevents creating too many connections to the database, especially in a serverless environment.
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// If we're not in production, attach the prisma instance to the global object.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;