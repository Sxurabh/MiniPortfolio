"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

// Helper function to check admin authentication
async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    throw new Error("Not authorized");
  }
  return session;
}

export async function uploadCv(formData: FormData) {
  try {
    await checkAdminAuth();
    const file = formData.get("cv") as File;
    if (!file) {
      return { error: "No file provided." };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(process.cwd(), "public", "cv-saurabh-kirve.pdf");
    await fs.writeFile(filePath, buffer);

    revalidatePath("/");
    return { success: "CV uploaded successfully!" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
}

export async function deleteCv() {
  try {
    await checkAdminAuth();
    const filePath = path.join(process.cwd(), "public", "cv-saurabh-kirve.pdf");
    await fs.unlink(filePath);
    revalidatePath("/");
    return { success: "CV deleted successfully!" };
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return { error: "CV not found." };
    }
    return { error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
}