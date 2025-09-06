// @/actions/thought.ts
"use server";

import prisma from "@/lib/prisma";
import { thoughtSchema, updateThoughtSchema } from "@/lib/schemas";
import { createCrudActions } from "../lib/crudFactory";

const thoughtActions = createCrudActions(
  prisma.thought,
  "Thought",
  thoughtSchema,
  updateThoughtSchema
);

export const addThought = thoughtActions.add;
export const updateThought = thoughtActions.update;
export const deleteThought = thoughtActions.del;