// @/hooks/use-is-admin.ts
"use client";

import { useSession } from "next-auth/react";

export function useIsAdmin() {
  const { data: session } = useSession();
  return session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
}