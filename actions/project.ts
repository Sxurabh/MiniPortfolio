"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { projectSchema, updateProjectSchema } from "@/lib/schemas";



// Helper function to check admin authentication
async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    throw new Error("Not authorized");
  }
}

export async function addProject(values: z.infer<typeof projectSchema>) {
  try {
    await checkAdminAuth();
    const validatedFields = projectSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields" };

    const { title, description, year, github, live, tech } = validatedFields.data;
    await prisma.project.create({
      data: { title, description, year, github, live, tech: tech.split(",").map(t => t.trim()) },
    });

    revalidatePath("/");
    return { success: "Project added!" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Database error." };
  }
}

export async function updateProject(values: z.infer<typeof updateProjectSchema>) {
  try {
    await checkAdminAuth();
    const validatedFields = updateProjectSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields" };

    const { id, title, description, year, github, live, tech } = validatedFields.data;
    await prisma.project.update({
      where: { id },
      data: { title, description, year, github, live, tech: tech.split(",").map(t => t.trim()) },
    });

    revalidatePath("/");
    return { success: "Project updated!" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Database error." };
  }
}

export async function deleteProject(id: number) {
  try {
    await checkAdminAuth();
    if (!id) return { error: "ID is required" };

    await prisma.project.delete({ where: { id } });
    revalidatePath("/");
    return { success: "Project deleted!" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Database error." };
  }
}
