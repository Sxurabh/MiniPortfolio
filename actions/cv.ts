// actions/cv.ts
"use server";

import { put, del } from '@vercel/blob';
import { revalidatePath } from "next/cache";
import { checkAdminAuth } from "@/lib/auth-utils";
import { env } from "@/lib/env.server"; // Import your validated env

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
    });

    revalidatePath("/");
    return { success: "CV uploaded successfully!", url: blob.url };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
}

export async function deleteCv() {
    try {
        await checkAdminAuth();
        
        const cvUrl = `${env.BLOB_URL_PREFIX}/${CV_BLOB_PATHNAME}`;
        
        await del(cvUrl);
        
        revalidatePath("/");
        return { success: "CV deleted successfully!" };
    } catch (error) {
        console.error("Delete CV Error:", error);
        return { error: "Failed to delete CV." };
    }
}