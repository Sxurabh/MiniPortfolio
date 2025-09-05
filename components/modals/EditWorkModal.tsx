"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateWorkExperienceSchema, type UpdateWorkExperienceFormValues } from "@/lib/schemas";
import { updateWorkExperience } from "@/actions/work";
import type { WorkExperience } from "@/lib/types";
import { toast } from "sonner";
import { CrudModal } from "./CrudModal";
import { FormButtons } from "./FormButtons";

interface EditWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  workExperience: WorkExperience | null;
}

export const EditWorkModal = ({ isOpen, onClose, workExperience }: EditWorkModalProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateWorkExperienceFormValues>({
    resolver: zodResolver(updateWorkExperienceSchema),
  });

  useEffect(() => {
    if (workExperience) {
      form.reset({
        id: workExperience.id,
        year: workExperience.year,
        role: workExperience.role,
        company: workExperience.company,
        description: workExperience.description,
        tech: workExperience.tech.join(", "),
      });
    }
  }, [workExperience, form]);

  const onSubmit = (values: UpdateWorkExperienceFormValues) => {
    setError("");
    startTransition(() => {
      updateWorkExperience(values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          form.reset();
          onClose();
        }
      });
    });
  };

  return (
    <CrudModal isOpen={isOpen} onClose={onClose} title="Edit Work Experience">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="year-edit" className="block text-sm font-medium text-muted-foreground mb-1">Year</label>
            <input id="year-edit" {...form.register("year")} className="w-full input-style" />
            {form.formState.errors.year && <p className="form-error">{form.formState.errors.year.message}</p>}
          </div>
          <div>
            <label htmlFor="role-edit" className="block text-sm font-medium text-muted-foreground mb-1">Role</label>
            <input id="role-edit" {...form.register("role")} className="w-full input-style" />
            {form.formState.errors.role && <p className="form-error">{form.formState.errors.role.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="company-edit" className="block text-sm font-medium text-muted-foreground mb-1">Company</label>
          <input id="company-edit" {...form.register("company")} className="w-full input-style" />
          {form.formState.errors.company && <p className="form-error">{form.formState.errors.company.message}</p>}
        </div>
        <div>
          <label htmlFor="description-edit" className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
          <textarea id="description-edit" {...form.register("description")} rows={4} className="w-full input-style" />
          {form.formState.errors.description && <p className="form-error">{form.formState.errors.description.message}</p>}
        </div>
        <div>
          <label htmlFor="tech-edit" className="block text-sm font-medium text-muted-foreground mb-1">Technologies (comma-separated)</label>
          <input id="tech-edit" {...form.register("tech")} className="w-full input-style" />
          {form.formState.errors.tech && <p className="form-error">{form.formState.errors.tech.message}</p>}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <FormButtons onClose={onClose} isPending={isPending} submitText="Update Work" />
      </form>
    </CrudModal>
  );
};