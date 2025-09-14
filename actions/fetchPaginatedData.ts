// sxurabh/miniportfolio/MiniPortfolio-Experimental-Branch/actions/fetchPaginatedData.ts
"use server";

import prisma from "@/lib/prisma";
import type { Certification, Project, Thought, WorkExperience } from "@/lib/types";

// --- Certification ---
export async function fetchPaginatedCertifications(page: number, limit: number): Promise<Certification[]> {
  const skip = (page - 1) * limit;
  const certifications = await prisma.certification.findMany({
    orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    skip,
    take: limit,
    select: { id: true, year: true, title: true, issuer: true, description: true, credential: true, link: true, createdAt: true },
  });
  return certifications;
}

// --- Project ---
export async function fetchPaginatedProjects(page: number, limit: number): Promise<Project[]> {
  const skip = (page - 1) * limit;
  return prisma.project.findMany({
    orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    skip,
    take: limit,
    // --- CHANGE: Add createdAt to the select query ---
    select: { id: true, title: true, description: true, tech: true, github: true, live: true, year: true, createdAt: true },
  });
}

// --- Thought ---
export async function fetchPaginatedThoughts(page: number, limit: number): Promise<Thought[]> {
  const skip = (page - 1) * limit;
  return prisma.thought.findMany({
    orderBy: { createdAt: 'desc' },
    skip,
    take: limit,
  });
}

// --- Work Experience ---
export async function fetchPaginatedWorkExperiences(page: number, limit: number): Promise<WorkExperience[]> {
  const skip = (page - 1) * limit;
  return prisma.workExperience.findMany({
    orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    skip,
    take: limit,
  });
}