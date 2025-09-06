// @/hooks/use-is-admin.ts
"use client";

import { useSession } from "next-auth/react";

// This hook now accesses the public environment variable directly.
// The variable is still validated on the server at build/run time,
// ensuring it is available and correct here.
export function useIsAdmin() {
  const { data: session } = useSession();
  return session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
}