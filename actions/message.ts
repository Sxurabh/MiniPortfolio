// @/actions/message.ts
"use server";

import { z } from "zod";
import prisma from "@/lib/prisma"; // Import prisma client
import { messageSchema } from "@/lib/schemas";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { env } from "@/lib/env.server";
import { revalidatePath } from "next/cache";

export async function sendMessage(values: z.infer<typeof messageSchema>) {
  try {
    const session = await getServerSession(authOptions);

    // Ensure user is logged in and has an ID
    if (!session?.user?.id) {
      return { error: "You must be logged in to send a message." };
    }

    // Prevent admin from using this form
    if (session.user.email === env.NEXT_PUBLIC_ADMIN_EMAIL) {
        return { error: "Admin cannot send messages via this form." };
    }

    const validatedFields = messageSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid message content." };
    }

    const { content } = validatedFields.data;
    
    // Save the message to the database
    await prisma.message.create({
      data: {
        content,
        userId: session.user.id,
      },
    });

    revalidatePath("/");
    return { success: "Message sent successfully!" };
  } catch (error) {
    console.error("SendMessage Error:", error);
    return { error: "An unexpected error occurred while sending the message." };
  }
}