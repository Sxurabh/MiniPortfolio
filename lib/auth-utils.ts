// @/lib/auth-utils.ts
"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    throw new Error("Not authorized");
  }
  return session;
}