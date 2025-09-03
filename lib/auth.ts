import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET || !process.env.AUTH_SECRET) {
  throw new Error("Missing required environment variables for authentication.");
}

const prisma = new PrismaClient();

// Use the correct `AuthOptions` type for the configuration object
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
};

// This part is now separate and used by the API route
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };