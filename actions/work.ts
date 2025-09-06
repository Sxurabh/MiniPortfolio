// @/actions/work.ts
"use server";

import prisma from "@/lib/prisma";
import { workExperienceSchema, updateWorkExperienceSchema } from "@/lib/schemas";
import { createCrudActions } from "../lib/crudFactory";

const workActions = createCrudActions(
  prisma.workExperience,
  "Work Experience",
  workExperienceSchema,
  updateWorkExperienceSchema
);

export const addWorkExperience = workActions.add;
export const updateWorkExperience = workActions.update;
export const deleteWorkExperience = workActions.del;