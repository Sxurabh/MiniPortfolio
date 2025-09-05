"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { thoughtSchema, type ThoughtFormValues } from "@/lib/schemas";
import { addThought } from "@/actions/thought";
import { toast } from "sonner";
import { CrudModal } from "./CrudModal";
import { FormButtons } from "./FormButtons";

interface AddThoughtModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddThoughtModal = ({ isOpen, onClose }: AddThoughtModalProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ThoughtFormValues>({
    resolver: zodResolver(thoughtSchema),
  });

  const onSubmit = (values: ThoughtFormValues) => {
    setError("");
    startTransition(() => {
      addThought(values).then((data) => {
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
    <CrudModal isOpen={isOpen} onClose={onClose} title="Add New Thought">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title-add-thought" className="block text-sm font-medium text-muted-foreground mb-1">Title</label>
          <input id="title-add-thought" {...register("title")} className="w-full input-style" />
          {errors.title && <p className="form-error">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="excerpt-add-thought" className="block text-sm font-medium text-muted-foreground mb-1">Excerpt</label>
          <textarea id="excerpt-add-thought" {...register("excerpt")} rows={3} className="w-full input-style" />
          {errors.excerpt && <p className="form-error">{errors.excerpt.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date-add-thought" className="block text-sm font-medium text-muted-foreground mb-1">Date</label>
            <input id="date-add-thought" {...register("date")} placeholder="Sept 2025" className="w-full input-style" />
            {errors.date && <p className="form-error">{errors.date.message}</p>}
          </div>
          <div>
            <label htmlFor="readTime-add-thought" className="block text-sm font-medium text-muted-foreground mb-1">Read Time</label>
            <input id="readTime-add-thought" {...register("readTime")} placeholder="6 min" className="w-full input-style" />
            {errors.readTime && <p className="form-error">{errors.readTime.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="url-add-thought" className="block text-sm font-medium text-muted-foreground mb-1">Article URL</label>
          <input id="url-add-thought" {...register("url")} className="w-full input-style" />
          {errors.url && <p className="form-error">{errors.url.message}</p>}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <FormButtons onClose={onClose} isPending={isPending} submitText="Save Thought" />
      </form>
    </CrudModal>
  );
};