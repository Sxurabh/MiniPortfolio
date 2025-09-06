// @/components/features/Projects/ProjectFormModal.tsx

"use client";

import React, { useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, updateProjectSchema, type ProjectFormValues, type UpdateProjectFormValues } from "@/lib/schemas";
import { addProject, updateProject } from "@/actions/project";
import type { Project } from "@/lib/types";
import { toast } from "sonner";
import { CrudModal } from "@/components/common/CrudModal";
import { FormButtons } from "@/components/common/FormButtons";

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export const ProjectFormModal = ({ isOpen, onClose, project }: ProjectFormModalProps) => {
  const isEditMode = project !== null;
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProjectFormValues | UpdateProjectFormValues>({
    resolver: zodResolver(isEditMode ? updateProjectSchema : projectSchema),
    defaultValues: isEditMode ? { ...project, tech: project.tech.join(", ") } : {},
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(isEditMode ? { ...project, tech: project.tech.join(", ") } : {});
    }
  }, [isOpen, project, isEditMode, form]);

  const handleFormSubmit = async (values: ProjectFormValues | UpdateProjectFormValues) => {
    const action = isEditMode
      ? updateProject(values as UpdateProjectFormValues)
      : addProject(values as ProjectFormValues);

    const result = await action;

    if (result.error) {
      toast.error(result.error);
    } else if (result.success) {
      toast.success(result.success);
      onClose();
    }
  };

  const onSubmit = (values: ProjectFormValues | UpdateProjectFormValues) => {
    startTransition(() => handleFormSubmit(values));
  };

  return (
    <CrudModal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Project" : "Add New Project"}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-1">Title</label>
            <input id="title" {...form.register("title")} className="w-full input-style" />
            {form.formState.errors.title && <p className="form-error">{form.formState.errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-muted-foreground mb-1">Year</label>
            <input id="year" {...form.register("year")} className="w-full input-style" />
            {form.formState.errors.year && <p className="form-error">{form.formState.errors.year.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
          <textarea id="description" {...form.register("description")} rows={3} className="w-full input-style" />
          {form.formState.errors.description && <p className="form-error">{form.formState.errors.description.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="github" className="block text-sm font-medium text-muted-foreground mb-1">GitHub URL</label>
            <input id="github" {...form.register("github")} className="w-full input-style" />
            {form.formState.errors.github && <p className="form-error">{form.formState.errors.github.message}</p>}
          </div>
          <div>
            <label htmlFor="live" className="block text-sm font-medium text-muted-foreground mb-1">Live URL</label>
            <input id="live" {...form.register("live")} className="w-full input-style" />
            {form.formState.errors.live && <p className="form-error">{form.formState.errors.live.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="tech" className="block text-sm font-medium text-muted-foreground mb-1">Technologies (comma-separated)</label>
          <input id="tech" {...form.register("tech")} className="w-full input-style" />
          {form.formState.errors.tech && <p className="form-error">{(form.formState.errors.tech as any).message}</p>}
        </div>
        <FormButtons onClose={onClose} isPending={isPending} submitText={isEditMode ? "Update Project" : "Save Project"} />
      </form>
    </CrudModal>
  );
};