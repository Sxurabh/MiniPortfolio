"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { workExperienceSchema, updateWorkExperienceSchema } from "@/lib/schemas";
import { checkAdminAuth } from "@/lib/auth-utils";

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