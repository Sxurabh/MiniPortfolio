// lib/auth.ts
import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { env } from "@/lib/env.server"; // Import from the new server-only env file

const prisma = new PrismaClient();

// Use the correct `AuthOptions` type for the configuration object
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
  secret: env.AUTH_SECRET,
};

// This part is now separate and used by the API route
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };