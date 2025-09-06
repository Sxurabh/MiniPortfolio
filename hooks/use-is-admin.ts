// @/hooks/use-is-admin.ts
"use client";

import { useSession } from "next-auth/react";
import { env } from "@/lib/env"; // Import the validated env variables

export function useIsAdmin() {
  const { data: session } = useSession();
  return session?.user?.email === env.NEXT_PUBLIC_ADMIN_EMAIL;
}