// lib/env.server.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
  DIRECT_URL: z.string().url("DIRECT_URL must be a valid URL"),
  GITHUB_ID: z.string().min(1, "GITHUB_ID is required"),
  GITHUB_SECRET: z.string().min(1, "GITHUB_SECRET is required"),
  AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required"),
  NEXT_PUBLIC_ADMIN_EMAIL: z
    .string()
    .email("NEXT_PUBLIC_ADMIN_EMAIL must be a valid email address"),
  BLOB_URL_PREFIX: z.string().url("BLOB_URL_PREFIX must be a valid URL"),
  // Add the new token schema here
  BLOB_READ_WRITE_TOKEN: z.string().min(1, "BLOB_READ_WRITE_TOKEN is required"),
});

export const env = envSchema.parse(process.env);