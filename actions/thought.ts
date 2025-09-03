"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { thoughtSchema, updateThoughtSchema } from "@/lib/schemas";

const prisma = new PrismaClient();

async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    throw new Error("Not authorized");
  }
}

export async function addThought(values: z.infer<typeof thoughtSchema>) {
  try {
    await checkAdminAuth();
    const validatedFields = thoughtSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields" };

    await prisma.thought.create({ data: validatedFields.data });
    revalidatePath("/");
    return { success: "Thought added!" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Database error." };
  }
}

export async function updateThought(values: z.infer<typeof updateThoughtSchema>) {
  try {
    await checkAdminAuth();
    const validatedFields = updateThoughtSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields" };

    const { id, ...data } = validatedFields.data;
    await prisma.thought.update({ where: { id }, data });
    revalidatePath("/");
    return { success: "Thought updated!" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Database error." };
  }
}

export async function deleteThought(id: number) {
  try {
    await checkAdminAuth();
    if (!id) return { error: "ID is required" };

    await prisma.thought.delete({ where: { id } });
    revalidatePath("/");
    return { success: "Thought deleted!" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Database error." };
  }
}