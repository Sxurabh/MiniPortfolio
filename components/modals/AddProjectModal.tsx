"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectFormValues } from "@/lib/schemas";
import { addProject } from "@/actions/project";
import { toast } from "sonner";
import { CrudModal } from "./CrudModal"; // Import new component
import { FormButtons } from "./FormButtons"; // Import new component

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddProjectModal = ({ isOpen, onClose }: AddProjectModalProps) => {
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = (values: ProjectFormValues) => {
    startTransition(() => {
      addProject(values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          reset();
          onClose();
        }
      });
    });
  };

  return (
    <CrudModal isOpen={isOpen} onClose={onClose} title="Add New Project">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-1">Title</label>
            <input id="title" {...register("title")} className="w-full input-style" />
            {errors.title && <p className="form-error">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-muted-foreground mb-1">Year</label>
            <input id="year" {...register("year")} className="w-full input-style" />
            {errors.year && <p className="form-error">{errors.year.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
          <textarea id="description" {...register("description")} rows={3} className="w-full input-style" />
          {errors.description && <p className="form-error">{errors.description.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="github" className="block text-sm font-medium text-muted-foreground mb-1">GitHub URL</label>
            <input id="github" {...register("github")} className="w-full input-style" />
            {errors.github && <p className="form-error">{errors.github.message}</p>}
          </div>
          <div>
            <label htmlFor="live" className="block text-sm font-medium text-muted-foreground mb-1">Live URL</label>
            <input id="live" {...register("live")} className="w-full input-style" />
            {errors.live && <p className="form-error">{errors.live.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="tech" className="block text-sm font-medium text-muted-foreground mb-1">Technologies (comma-separated)</label>
          <input id="tech" {...register("tech")} className="w-full input-style" />
          {errors.tech && <p className="form-error">{errors.tech.message}</p>}
        </div>
        <FormButtons onClose={onClose} isPending={isPending} submitText="Save Project" />
      </form>
    </CrudModal>
  );
};