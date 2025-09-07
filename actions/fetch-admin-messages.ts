"use server";

import { checkAdminAuth } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import type { MessageWithUser } from "@/lib/types";

export async function fetchAdminMessages(): Promise<MessageWithUser[]> {
  try {
    await checkAdminAuth(); // This will throw an error if not admin
  } catch (error) {
    console.error("Non-admin tried to fetch messages:", error);
    return []; // Return empty if not admin
  }

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  });
  return messages;
}