"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProjectSchema, type UpdateProjectFormValues } from "@/lib/schemas";
import { updateProject } from "@/actions/project";
import { X } from "lucide-react";
import type { Project } from "@/lib/types";

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export const EditProjectModal = ({ isOpen, onClose, project }: EditProjectModalProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateProjectFormValues>({
    resolver: zodResolver(updateProjectSchema),
  });

  useEffect(() => {
    if (project) {
      reset({
        id: project.id,
        title: project.title,
        description: project.description,
        year: project.year,
        github: project.github,
        live: project.live,
        tech: project.tech.join(", "),
      });
    }
  }, [project, reset]);

  const onSubmit = (values: UpdateProjectFormValues) => {
    setError("");
    startTransition(() => {
      updateProject(values).then((data) => {
        if (data.error) setError(data.error);
        if (data.success) onClose();
      });
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-lg p-8 space-y-6 bg-background border border-border rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Edit Project</h3>
          <button onClick={onClose} className="p-1 rounded-full text-muted-foreground hover:bg-accent transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Form fields are identical to AddProjectModal */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="title-edit" className="block text-sm font-medium text-muted-foreground mb-1">Title</label>
              <input id="title-edit" {...register("title")} className="w-full input-style" />
              {errors.title && <p className="form-error">{errors.title.message}</p>}
            </div>
            <div>
              <label htmlFor="year-edit" className="block text-sm font-medium text-muted-foreground mb-1">Year</label>
              <input id="year-edit" {...register("year")} className="w-full input-style" />
              {errors.year && <p className="form-error">{errors.year.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="description-edit" className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
            <textarea id="description-edit" {...register("description")} rows={3} className="w-full input-style" />
            {errors.description && <p className="form-error">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="github-edit" className="block text-sm font-medium text-muted-foreground mb-1">GitHub URL</label>
              <input id="github-edit" {...register("github")} className="w-full input-style" />
              {errors.github && <p className="form-error">{errors.github.message}</p>}
            </div>
            <div>
              <label htmlFor="live-edit" className="block text-sm font-medium text-muted-foreground mb-1">Live URL</label>
              <input id="live-edit" {...register("live")} className="w-full input-style" />
              {errors.live && <p className="form-error">{errors.live.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="tech-edit" className="block text-sm font-medium text-muted-foreground mb-1">Technologies (comma-separated)</label>
            <input id="tech-edit" {...register("tech")} className="w-full input-style" />
            {errors.tech && <p className="form-error">{errors.tech.message}</p>}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-accent transition-colors">Cancel</button>
            <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors">
              {isPending ? "Updating..." : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
