// @/lib/auth-utils.ts
"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { env } from "@/lib/env.server"; // Import from the new server-only env file

export async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.email !== env.NEXT_PUBLIC_ADMIN_EMAIL) {
    throw new Error("Not authorized");
  }
  return session;
}