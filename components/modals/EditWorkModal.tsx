"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateWorkExperienceSchema, type UpdateWorkExperienceFormValues } from "@/lib/schemas";
import { updateWorkExperience } from "@/actions/work";
import { X } from "lucide-react";
import type { WorkExperience } from "@/lib/types";
import { toast } from "sonner";


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
    defaultValues: {
      id: workExperience?.id,
      year: workExperience?.year || "",
      role: workExperience?.role || "",
      company: workExperience?.company || "",
      description: workExperience?.description || "",
      tech: workExperience?.tech.join(", ") || "",
    },
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
          
        }
      });
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-lg p-8 space-y-6 bg-background border border-border rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Edit Work Experience</h3>
          <button onClick={onClose} className="p-1 rounded-full text-muted-foreground hover:bg-accent transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Form fields are identical to AddWorkModal, so I'm omitting them for brevity. You can copy them from AddWorkModal.tsx */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="year-edit" className="block text-sm font-medium text-muted-foreground mb-1">Year</label>
              <input id="year-edit" {...form.register("year")} className="w-full px-3 py-2 bg-transparent border border-border rounded-md text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring" />
              {form.formState.errors.year && <p className="text-xs text-red-500 mt-1">{form.formState.errors.year.message}</p>}
            </div>
            <div>
              <label htmlFor="role-edit" className="block text-sm font-medium text-muted-foreground mb-1">Role</label>
              <input id="role-edit" {...form.register("role")} className="w-full px-3 py-2 bg-transparent border border-border rounded-md text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring" />
              {form.formState.errors.role && <p className="text-xs text-red-500 mt-1">{form.formState.errors.role.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="company-edit" className="block text-sm font-medium text-muted-foreground mb-1">Company</label>
            <input id="company-edit" {...form.register("company")} className="w-full px-3 py-2 bg-transparent border border-border rounded-md text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring" />
            {form.formState.errors.company && <p className="text-xs text-red-500 mt-1">{form.formState.errors.company.message}</p>}
          </div>
          <div>
            <label htmlFor="description-edit" className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
            <textarea id="description-edit" {...form.register("description")} rows={4} className="w-full px-3 py-2 bg-transparent border border-border rounded-md text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring" />
            {form.formState.errors.description && <p className="text-xs text-red-500 mt-1">{form.formState.errors.description.message}</p>}
          </div>
          <div>
            <label htmlFor="tech-edit" className="block text-sm font-medium text-muted-foreground mb-1">Technologies (comma-separated)</label>
            <input id="tech-edit" {...form.register("tech")} className="w-full px-3 py-2 bg-transparent border border-border rounded-md text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring" />
            {form.formState.errors.tech && <p className="text-xs text-red-500 mt-1">{form.formState.errors.tech.message}</p>}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-accent transition-colors">Cancel</button>
            <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors">
              {isPending ? "Updating..." : "Update Work"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};