// @/lib/crudFactory.ts
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkAdminAuth } from "@/lib/auth-utils";

// Define a generic interface for Prisma models
interface PrismaModel {
  create(args: any): Promise<any>;
  update(args: any): Promise<any>;
  delete(args: any): Promise<any>;
}

// A stricter type to ensure the update schema always includes an 'id'
type UpdateSchemaWithId = z.ZodObject<{ id: z.ZodNumber, [k: string]: any }>;

// The factory function itself - NOT a server action
export function createCrudActions<
  TModel extends PrismaModel,
  TCreateSchema extends z.ZodTypeAny,
  TUpdateSchema extends UpdateSchemaWithId,
>(model: TModel, modelName: string, createSchema: TCreateSchema, updateSchema: TUpdateSchema) {
  
  // The actual server action for adding an item
  const add = async (values: z.infer<TCreateSchema>) => {
    try {
      await checkAdminAuth();
      const validatedFields = createSchema.safeParse(values);
      if (!validatedFields.success) return { error: "Invalid fields" };

      let data = validatedFields.data;
      // Handle tech field conversion from string to array
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

  // The actual server action for updating an item
  const update = async (values: z.infer<TUpdateSchema>) => {
    try {
      await checkAdminAuth();
      const validatedFields = updateSchema.safeParse(values);
      if (!validatedFields.success) return { error: "Invalid fields" };
      
      const { id, ...rest } = validatedFields.data;
      let data: any = rest;

      // Handle tech field conversion
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

  // The actual server action for deleting an item
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