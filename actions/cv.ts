"use server";

import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { checkAdminAuth } from "@/lib/auth-utils";

export async function uploadCv(formData: FormData) {
  try {
    await checkAdminAuth();
    const file = formData.get("cv") as File;
    if (!file) {
      return { error: "No file provided." };
    }

    if (file.type !== "application/pdf") {
      return { error: "Invalid file type. Only PDFs are allowed." };
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