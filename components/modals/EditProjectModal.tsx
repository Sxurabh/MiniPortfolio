"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProjectSchema, type UpdateProjectFormValues } from "@/lib/schemas";
import { updateProject } from "@/actions/project";
import type { Project } from "@/lib/types";
import { toast } from "sonner";
import { CrudModal } from "./CrudModal";
import { FormButtons } from "./FormButtons";

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
    <CrudModal isOpen={isOpen} onClose={onClose} title="Edit Project">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <FormButtons onClose={onClose} isPending={isPending} submitText="Update Project" />
      </form>
    </CrudModal>
  );
};