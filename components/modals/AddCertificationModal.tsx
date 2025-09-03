"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { certificationSchema, type CertificationFormValues } from "@/lib/schemas";
import { addCertification } from "@/actions/certification";
import { X } from "lucide-react";

interface AddCertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCertificationModal = ({ isOpen, onClose }: AddCertificationModalProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
  });

  const onSubmit = (values: CertificationFormValues) => {
    setError("");
    startTransition(() => {
      addCertification(values).then((data) => {
        if (data.error) setError(data.error);
        if (data.success) {
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
          <h3 className="text-xl font-semibold">Add New Certification</h3>
          <button onClick={onClose} className="p-1 rounded-full text-muted-foreground hover:bg-accent transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="title-add-cert" className="block text-sm font-medium text-muted-foreground mb-1">Title</label>
              <input id="title-add-cert" {...register("title")} className="w-full input-style" />
              {errors.title && <p className="form-error">{errors.title.message}</p>}
            </div>
            <div>
              <label htmlFor="issuer-add-cert" className="block text-sm font-medium text-muted-foreground mb-1">Issuer</label>
              <input id="issuer-add-cert" {...register("issuer")} className="w-full input-style" />
              {errors.issuer && <p className="form-error">{errors.issuer.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="year-add-cert" className="block text-sm font-medium text-muted-foreground mb-1">Year</label>
              <input id="year-add-cert" {...register("year")} className="w-full input-style" />
              {errors.year && <p className="form-error">{errors.year.message}</p>}
            </div>
             <div>
              <label htmlFor="credential-add-cert" className="block text-sm font-medium text-muted-foreground mb-1">Credential ID</label>
              <input id="credential-add-cert" {...register("credential")} className="w-full input-style" />
              {errors.credential && <p className="form-error">{errors.credential.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="link-add-cert" className="block text-sm font-medium text-muted-foreground mb-1">Verification Link</label>
            <input id="link-add-cert" {...register("link")} className="w-full input-style" />
            {errors.link && <p className="form-error">{errors.link.message}</p>}
          </div>
          <div>
            <label htmlFor="description-add-cert" className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
            <textarea id="description-add-cert" {...register("description")} rows={3} className="w-full input-style" />
            {errors.description && <p className="form-error">{errors.description.message}</p>}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-accent transition-colors">Cancel</button>
            <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors">
              {isPending ? "Saving..." : "Save Certification"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};