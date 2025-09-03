"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { workExperienceSchema, updateWorkExperienceSchema } from "@/lib/schemas";

const prisma = new PrismaClient();

// Helper function to check admin authentication
async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    throw new Error("Not authorized");
  }
  return session;
}

export async function addWorkExperience(values: z.infer<typeof workExperienceSchema>) {
  try {
    await checkAdminAuth();
    const validatedFields = workExperienceSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields" };

    const { year, role, company, description, tech } = validatedFields.data;
    await prisma.workExperience.create({
      data: { year, role, company, description, tech: tech.split(",").map((item) => item.trim()) },
    });
    revalidatePath("/");
    return { success: "Work experience added!" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
}

export async function updateWorkExperience(values: z.infer<typeof updateWorkExperienceSchema>) {
  try {
    await checkAdminAuth();
    const validatedFields = updateWorkExperienceSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields" };

    const { id, year, role, company, description, tech } = validatedFields.data;
    await prisma.workExperience.update({
      where: { id },
      data: { year, role, company, description, tech: tech.split(",").map((item) => item.trim()) },
    });
    revalidatePath("/");
    return { success: "Work experience updated!" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
}

export async function deleteWorkExperience(id: number) {
  try {
    await checkAdminAuth();
    if (!id) return { error: "ID is required" };

    await prisma.workExperience.delete({ where: { id } });
    revalidatePath("/");
    return { success: "Work experience deleted!" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
}