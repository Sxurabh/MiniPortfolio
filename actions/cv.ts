// actions/cv.ts
"use server";

import { put, del } from '@vercel/blob';
import { revalidatePath } from "next/cache";
import { checkAdminAuth } from "@/lib/auth-utils";
import { env } from "@/lib/env.server";

const CV_BLOB_PATHNAME = "cv-saurabh-kirve.pdf";

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

    const blob = await put(CV_BLOB_PATHNAME, file, {
      access: 'public',
      cacheControlMaxAge: 60,
      allowOverwrite: true, // Allow replacing the existing CV
    });

    revalidatePath("/");
    return { success: "CV uploaded successfully!", url: blob.url };
  } catch (error) {
    // Check if the error is the specific blob overwrite error, though allowOverwrite should prevent it.
    if (error instanceof Error && error.message.includes("This blob already exists")) {
        return { error: "The CV already exists. Please delete the old one first." };
    }
    return { error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
}

export async function deleteCv() {
    try {
        await checkAdminAuth();
        
        // The URL needs to be constructed with the prefix only for deletion
        const cvUrlToDelete = `${env.BLOB_URL_PREFIX}/${CV_BLOB_PATHNAME}`;
        
        await del(cvUrlToDelete);
        
        revalidatePath("/");
        return { success: "CV deleted successfully!" };
    } catch (error) {
        // Vercel Blob's del function throws errors that might not have a clean message.
        // It's better to log the actual error for debugging.
        console.error("Delete CV Error:", error);
        return { error: "Failed to delete CV." };
    }
}