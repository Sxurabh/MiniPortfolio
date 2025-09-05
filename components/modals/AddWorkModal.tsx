"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workExperienceSchema, type WorkExperienceFormValues } from "@/lib/schemas";
import { addWorkExperience } from "@/actions/work";
import { toast } from "sonner";
import { CrudModal } from "./CrudModal";
import { FormButtons } from "./FormButtons";

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
    <CrudModal isOpen={isOpen} onClose={onClose} title="Add New Work Experience">
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

        <FormButtons onClose={onClose} isPending={isPending} submitText="Save Work" />
      </form>
    </CrudModal>
  );
};