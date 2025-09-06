"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { thoughtSchema, updateThoughtSchema } from "@/lib/schemas";
import { checkAdminAuth } from "@/lib/auth-utils";

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