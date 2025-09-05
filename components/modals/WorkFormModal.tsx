"use client";

import React, { useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workExperienceSchema, updateWorkExperienceSchema, type WorkExperienceFormValues, type UpdateWorkExperienceFormValues } from "@/lib/schemas";
import { addWorkExperience, updateWorkExperience } from "@/actions/work";
import type { WorkExperience } from "@/lib/types";
import { toast } from "sonner";
import { CrudModal } from "./CrudModal";
import { FormButtons } from "./FormButtons";

interface WorkFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  workExperience: WorkExperience | null;
}

export const WorkFormModal = ({ isOpen, onClose, workExperience }: WorkFormModalProps) => {
  const isEditMode = workExperience !== null;
  const [isPending, startTransition] = useTransition();

  const form = useForm<WorkExperienceFormValues | UpdateWorkExperienceFormValues>({
    resolver: zodResolver(isEditMode ? updateWorkExperienceSchema : workExperienceSchema),
    defaultValues: isEditMode ? { ...workExperience, tech: workExperience.tech.join(", ") } : {},
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(isEditMode ? { ...workExperience, tech: workExperience!.tech.join(", ") } : {});
    }
  }, [isOpen, workExperience, isEditMode, form]);

  const onSubmit = (values: WorkExperienceFormValues | UpdateWorkExperienceFormValues) => {
    startTransition(() => {
      const action = isEditMode
        ? updateWorkExperience(values as UpdateWorkExperienceFormValues)
        : addWorkExperience(values as WorkExperienceFormValues);

      action.then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          onClose();
        }
      });
    });
  };

  return (
    <CrudModal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Work Experience" : "Add New Work Experience"}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-muted-foreground mb-1">Year</label>
            <input id="year" {...form.register("year")} placeholder="2023 - Present" className="w-full input-style" />
            {form.formState.errors.year && <p className="form-error">{form.formState.errors.year.message}</p>}
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-muted-foreground mb-1">Role</label>
            <input id="role" {...form.register("role")} placeholder="Associate Analyst" className="w-full input-style" />
            {form.formState.errors.role && <p className="form-error">{form.formState.errors.role.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-muted-foreground mb-1">Company</label>
          <input id="company" {...form.register("company")} placeholder="SG Analytics" className="w-full input-style" />
          {form.formState.errors.company && <p className="form-error">{form.formState.errors.company.message}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
          <textarea id="description" {...form.register("description")} placeholder="Leveraged Python, Power BI..." rows={4} className="w-full input-style"/>
          {form.formState.errors.description && <p className="form-error">{form.formState.errors.description.message}</p>}
        </div>
        <div>
          <label htmlFor="tech" className="block text-sm font-medium text-muted-foreground mb-1">Technologies (comma-separated)</label>
          <input id="tech" {...form.register("tech")} placeholder="Python, SQL, Power BI" className="w-full input-style" />
          {form.formState.errors.tech && <p className="form-error">{(form.formState.errors.tech as any).message}</p>}
        </div>
        <FormButtons onClose={onClose} isPending={isPending} submitText={isEditMode ? "Update Work" : "Save Work"} />
      </form>
    </CrudModal>
  );
};