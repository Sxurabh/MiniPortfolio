import { PrismaClient } from '@prisma/client';

// Declare a global variable to hold the Prisma client instance.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create a single instance of the Prisma client and reuse it.
// This prevents creating too many connections to the database.
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

// If we're not in production, attach the prisma instance to the global object.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;