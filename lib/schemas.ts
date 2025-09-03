import { z } from "zod";

// --- Work Schemas ---
export const workExperienceSchema = z.object({
  year: z.string().min(1, "Year is required."),
  role: z.string().min(1, "Role is required."),
  company: z.string().min(1, "Company is required."),
  description: z.string().min(1, "Description is required."),
  tech: z.string().min(1, "At least one technology is required."),
});

export const updateWorkExperienceSchema = workExperienceSchema.extend({
  id: z.number(),
});

export type WorkExperienceFormValues = z.infer<typeof workExperienceSchema>;
export type UpdateWorkExperienceFormValues = z.infer<typeof updateWorkExperienceSchema>;


// --- Project Schemas (NEW) ---
export const projectSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  year: z.string().min(1, "Year is required."),
  github: z.string().url("Must be a valid URL.").min(1, "GitHub link is required."),
  live: z.string().url("Must be a valid URL.").min(1, "Live link is required."),
  tech: z.string().min(1, "At least one technology is required."),
});

export const updateProjectSchema = projectSchema.extend({
  id: z.number(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
export type UpdateProjectFormValues = z.infer<typeof updateProjectSchema>;

// --- Certification Schemas (NEW) ---
export const certificationSchema = z.object({
  title: z.string().min(1, "Title is required."),
  issuer: z.string().min(1, "Issuer is required."),
  year: z.string().min(1, "Year is required."),
  description: z.string().min(1, "Description is required."),
  credential: z.string().min(1, "Credential ID is required."),
  link: z.string().url("Must be a valid URL.").min(1, "Link is required."),
});

export const updateCertificationSchema = certificationSchema.extend({
  id: z.number(),
});

export type CertificationFormValues = z.infer<typeof certificationSchema>;
export type UpdateCertificationFormValues = z.infer<typeof updateCertificationSchema>;

// --- Thought Schemas (NEW) ---
export const thoughtSchema = z.object({
  title: z.string().min(1, "Title is required."),
  excerpt: z.string().min(1, "Excerpt is required."),
  date: z.string().min(1, "Date is required."),
  readTime: z.string().min(1, "Read time is required."),
  url: z.string().url("Must be a valid URL.").min(1, "URL is required."),
});

export const updateThoughtSchema = thoughtSchema.extend({
  id: z.number(),
});

export type ThoughtFormValues = z.infer<typeof thoughtSchema>;
export type UpdateThoughtFormValues = z.infer<typeof updateThoughtSchema>;