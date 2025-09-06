"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { certificationSchema, updateCertificationSchema } from "@/lib/schemas";
import { checkAdminAuth } from "@/lib/auth-utils";

export async function addCertification(values: z.infer<typeof certificationSchema>) {
  try {
    await checkAdminAuth();
    const validatedFields = certificationSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields" };

    await prisma.certification.create({ data: validatedFields.data });

    revalidatePath("/");
    return { success: "Certification added!" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Database error." };
  }
}

export async function updateCertification(values: z.infer<typeof updateCertificationSchema>) {
  try {
    await checkAdminAuth();
    const validatedFields = updateCertificationSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields" };

    const { id, ...data } = validatedFields.data;
    await prisma.certification.update({ where: { id }, data });

    revalidatePath("/");
    return { success: "Certification updated!" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Database error." };
  }
}

export async function deleteCertification(id: number) {
  try {
    await checkAdminAuth();
    if (!id) return { error: "ID is required" };

    await prisma.certification.delete({ where: { id } });
    revalidatePath("/");
    return { success: "Certification deleted!" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Database error." };
  }
}