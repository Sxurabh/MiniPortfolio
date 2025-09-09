// lib/next-auth.d.ts
import NextAuth, { type DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   
   */
  interface Session {
    user: {
      /** The user's id from the database. */
      id: string;
    } & DefaultSession["user"]; // Keep the default properties
  }
}