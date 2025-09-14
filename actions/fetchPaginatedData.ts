// sxurabh/miniportfolio/MiniPortfolio-ExperimentalBranch/actions/fetchPaginatedData.ts
"use server";

import prisma from "@/lib/prisma";
import type { Certification, Project, Thought, WorkExperience } from "@/lib/types";

// --- Certification ---
export async function fetchPaginatedCertifications(page: number, limit: number): Promise<Certification[]> {
  const skip = (page - 1) * limit;
  return prisma.certification.findMany({
    // --- FIX: Add secondary sort by createdAt ---
    orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    skip,
    take: limit,
  });
}

// --- Project ---
export async function fetchPaginatedProjects(page: number, limit: number): Promise<Project[]> {
  const skip = (page - 1) * limit;
  return prisma.project.findMany({
    // --- FIX: Add secondary sort by createdAt ---
    orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    skip,
    take: limit,
  });
}

// --- Thought ---
export async function fetchPaginatedThoughts(page: number, limit: number): Promise<Thought[]> {
  const skip = (page - 1) * limit;
  return prisma.thought.findMany({
    orderBy: { createdAt: 'desc' }, // This was already correct
    skip,
    take: limit,
  });
}

// --- Work Experience ---
export async function fetchPaginatedWorkExperiences(page: number, limit: number): Promise<WorkExperience[]> {
  const skip = (page - 1) * limit;
  return prisma.workExperience.findMany({
    // --- FIX: Add secondary sort by createdAt ---
    orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    skip,
    take: limit,
  });
}