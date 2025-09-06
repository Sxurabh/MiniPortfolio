// @/actions/certification.ts
"use server";

import prisma from "@/lib/prisma";
import { certificationSchema, updateCertificationSchema } from "@/lib/schemas";
import { createCrudActions } from "../lib/crudFactory";

const certificationActions = createCrudActions(
  prisma.certification,
  "Certification",
  certificationSchema,
  updateCertificationSchema
);

export const addCertification = certificationActions.add;
export const updateCertification = certificationActions.update;
export const deleteCertification = certificationActions.del;