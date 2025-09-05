"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateThoughtSchema, type UpdateThoughtFormValues } from "@/lib/schemas";
import { updateThought } from "@/actions/thought";
import { X } from "lucide-react";
import type { Thought } from "@/lib/types";
import { toast } from "sonner";



interface EditThoughtModalProps {
  isOpen: boolean;
  onClose: () => void;
  thought: Thought | null;
}

export const EditThoughtModal = ({ isOpen, onClose, thought }: EditThoughtModalProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateThoughtFormValues>({
    resolver: zodResolver(updateThoughtSchema),
  });

  useEffect(() => {
    if (thought) {
      reset({
        id: thought.id,
        title: thought.title,
        excerpt: thought.excerpt,
        date: thought.date,
        readTime: thought.readTime,
        url: thought.url,
      });
    }
  }, [thought, reset]);

  const onSubmit = (values: UpdateThoughtFormValues) => {
    setError("");
    startTransition(() => {
      updateThought(values).then((data) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-lg p-8 space-y-6 bg-background border border-border rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Edit Thought</h3>
          <button onClick={onClose} className="p-1 rounded-full text-muted-foreground hover:bg-accent transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
           {/* Form fields are identical to AddThoughtModal */}
           <div>
            <label htmlFor="title-edit-thought" className="block text-sm font-medium text-muted-foreground mb-1">Title</label>
            <input id="title-edit-thought" {...register("title")} className="w-full input-style" />
            {errors.title && <p className="form-error">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="excerpt-edit-thought" className="block text-sm font-medium text-muted-foreground mb-1">Excerpt</label>
            <textarea id="excerpt-edit-thought" {...register("excerpt")} rows={3} className="w-full input-style" />
            {errors.excerpt && <p className="form-error">{errors.excerpt.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date-edit-thought" className="block text-sm font-medium text-muted-foreground mb-1">Date</label>
              <input id="date-edit-thought" {...register("date")} className="w-full input-style" />
              {errors.date && <p className="form-error">{errors.date.message}</p>}
            </div>
             <div>
              <label htmlFor="readTime-edit-thought" className="block text-sm font-medium text-muted-foreground mb-1">Read Time</label>
              <input id="readTime-edit-thought" {...register("readTime")} className="w-full input-style" />
              {errors.readTime && <p className="form-error">{errors.readTime.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="url-edit-thought" className="block text-sm font-medium text-muted-foreground mb-1">Article URL</label>
            <input id="url-edit-thought" {...register("url")} className="w-full input-style" />
            {errors.url && <p className="form-error">{errors.url.message}</p>}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-accent transition-colors">Cancel</button>
            <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors">
              {isPending ? "Updating..." : "Update Thought"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};