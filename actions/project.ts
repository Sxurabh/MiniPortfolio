// @/actions/project.ts
"use server";

import prisma from "@/lib/prisma";
import { projectSchema, updateProjectSchema } from "@/lib/schemas";
import { createCrudActions } from "../lib/crudFactory";

const projectActions = createCrudActions(
  prisma.project,
  "Project",
  projectSchema,
  updateProjectSchema
);

export const addProject = projectActions.add;
export const updateProject = projectActions.update;
export const deleteProject = projectActions.del;