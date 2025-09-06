// @/actions/lib/crudFactory.ts
"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkAdminAuth } from "@/lib/auth-utils";

interface PrismaModel {
  create(args: any): Promise<any>;
  update(args: any): Promise<any>;
  delete(args: any): Promise<any>;
}

// Stricter type for the update schema to ensure it has an 'id'
type UpdateSchemaWithId = z.ZodObject<{ id: z.ZodNumber, [k: string]: any }>;

export function createCrudActions<
  TModel extends PrismaModel,
  TCreateSchema extends z.ZodTypeAny,
  TUpdateSchema extends UpdateSchemaWithId,
>(model: TModel, modelName: string, createSchema: TCreateSchema, updateSchema: TUpdateSchema) {
  
  // ADD Action
  const add = async (values: z.infer<TCreateSchema>) => {
    try {
      await checkAdminAuth();
      const validatedFields = createSchema.safeParse(values);
      if (!validatedFields.success) return { error: "Invalid fields" };

      let data = validatedFields.data;
      if (data.tech && typeof data.tech === 'string') {
        data.tech = data.tech.split(",").map((t: string) => t.trim());
      }

      await model.create({ data });

      revalidatePath("/");
      return { success: `${modelName} added!` };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Database error." };
    }
  };

  // UPDATE Action
  const update = async (values: z.infer<TUpdateSchema>) => {
    try {
      await checkAdminAuth();
      const validatedFields = updateSchema.safeParse(values);
      if (!validatedFields.success) return { error: "Invalid fields" };
      
      const { id, ...rest } = validatedFields.data;
      let data: any = rest;
       if (data.tech && typeof data.tech === 'string') {
        data.tech = data.tech.split(",").map((t: string) => t.trim());
      }
      
      await model.update({ where: { id }, data });

      revalidatePath("/");
      return { success: `${modelName} updated!` };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Database error." };
    }
  };

  // DELETE Action
  const del = async (id: number) => {
    try {
      await checkAdminAuth();
      if (!id) return { error: "ID is required" };

      await model.delete({ where: { id } });
      revalidatePath("/");
      return { success: `${modelName} deleted!` };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Database error." };
    }
  };

  return { add, update, del };
}