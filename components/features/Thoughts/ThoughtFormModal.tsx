"use client";

import React, { useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { thoughtSchema, updateThoughtSchema, type ThoughtFormValues, type UpdateThoughtFormValues } from "@/lib/schemas";
import { addThought, updateThought } from "@/actions/thought";
import type { Thought } from "@/lib/types";
import { toast } from "sonner";
import { CrudModal } from "@/components/common/CrudModal";
import { FormButtons } from "@/components/common/FormButtons";

interface ThoughtFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  thought: Thought | null;
}

export const ThoughtFormModal = ({ isOpen, onClose, thought }: ThoughtFormModalProps) => {
  const isEditMode = thought !== null;
  const [isPending, startTransition] = useTransition();

  const form = useForm<ThoughtFormValues | UpdateThoughtFormValues>({
    resolver: zodResolver(isEditMode ? updateThoughtSchema : thoughtSchema),
    defaultValues: isEditMode ? thought : {},
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(isEditMode ? thought! : {});
    }
  }, [isOpen, thought, isEditMode, form]);

  const handleFormSubmit = async (values: ThoughtFormValues | UpdateThoughtFormValues) => {
    const action = isEditMode
      ? updateThought(values as UpdateThoughtFormValues)
      : addThought(values as ThoughtFormValues);

    const result = await action;
    
    if (result.error) {
      toast.error(result.error);
    }
    if (result.success) {
      toast.success(result.success);
      onClose();
    }
  };

  const onSubmit = (values: ThoughtFormValues | UpdateThoughtFormValues) => {
    startTransition(() => handleFormSubmit(values));
  };

  return (
    <CrudModal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Thought" : "Add New Thought"}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title-thought" className="block text-sm font-medium text-muted-foreground mb-1">Title</label>
          <input id="title-thought" {...form.register("title")} className="w-full input-style" />
          {form.formState.errors.title && <p className="form-error">{form.formState.errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="excerpt-thought" className="block text-sm font-medium text-muted-foreground mb-1">Excerpt</label>
          <textarea id="excerpt-thought" {...form.register("excerpt")} rows={3} className="w-full input-style" />
          {form.formState.errors.excerpt && <p className="form-error">{form.formState.errors.excerpt.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date-thought" className="block text-sm font-medium text-muted-foreground mb-1">Date</label>
            <input id="date-thought" {...form.register("date")} placeholder="Sept 2025" className="w-full input-style" />
            {form.formState.errors.date && <p className="form-error">{form.formState.errors.date.message}</p>}
          </div>
            <div>
            <label htmlFor="readTime-thought" className="block text-sm font-medium text-muted-foreground mb-1">Read Time</label>
            <input id="readTime-thought" {...form.register("readTime")} placeholder="6 min" className="w-full input-style" />
            {form.formState.errors.readTime && <p className="form-error">{form.formState.errors.readTime.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="url-thought" className="block text-sm font-medium text-muted-foreground mb-1">Article URL</label>
          <input id="url-thought" {...form.register("url")} className="w-full input-style" />
          {form.formState.errors.url && <p className="form-error">{form.formState.errors.url.message}</p>}
        </div>
        <FormButtons onClose={onClose} isPending={isPending} submitText={isEditMode ? "Update Thought" : "Save Thought"} />
      </form>
    </CrudModal>
  );
};