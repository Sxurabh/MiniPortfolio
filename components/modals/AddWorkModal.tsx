"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workExperienceSchema, type WorkExperienceFormValues } from "@/lib/schemas";
import { addWorkExperience } from "@/actions/work";
import { X } from "lucide-react";

interface AddWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddWorkModal = ({ isOpen, onClose }: AddWorkModalProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorkExperienceFormValues>({
    resolver: zodResolver(workExperienceSchema),
  });

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const onSubmit = (values: WorkExperienceFormValues) => {
    setError("");

    startTransition(() => {
      addWorkExperience(values).then((data) => {
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          reset();
          onClose();
        }
      });
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg p-8 space-y-6 bg-background border border-border rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Add New Work Experience</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-muted-foreground hover:bg-accent transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-muted-foreground mb-1">Year</label>
              <input id="year" {...register("year")} placeholder="2023 - Present" className="w-full input-style" />
              {errors.year && <p className="form-error">{errors.year.message}</p>}
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-muted-foreground mb-1">Role</label>
              <input id="role" {...register("role")} placeholder="Associate Analyst" className="w-full input-style" />
              {errors.role && <p className="form-error">{errors.role.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-muted-foreground mb-1">Company</label>
            <input id="company" {...register("company")} placeholder="SG Analytics" className="w-full input-style" />
            {errors.company && <p className="form-error">{errors.company.message}</p>}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
            <textarea id="description" {...register("description")} placeholder="Leveraged Python, Power BI..." rows={4} className="w-full input-style"/>
            {errors.description && <p className="form-error">{errors.description.message}</p>}
          </div>
          <div>
            <label htmlFor="tech" className="block text-sm font-medium text-muted-foreground mb-1">Technologies (comma-separated)</label>
            <input id="tech" {...register("tech")} placeholder="Python, SQL, Power BI" className="w-full input-style" />
            {errors.tech && <p className="form-error">{errors.tech.message}</p>}
          </div>
          
          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
             <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-accent transition-colors">Cancel</button>
            <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors">
              {isPending ? "Saving..." : "Save Work"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};