"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCertificationSchema, type UpdateCertificationFormValues } from "@/lib/schemas";
import { updateCertification } from "@/actions/certification";
import type { Certification } from "@/lib/types";
import { toast } from "sonner";
import { CrudModal } from "./CrudModal";
import { FormButtons } from "./FormButtons";

interface EditCertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certification: Certification | null;
}

export const EditCertificationModal = ({ isOpen, onClose, certification }: EditCertificationModalProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateCertificationFormValues>({
    resolver: zodResolver(updateCertificationSchema),
  });

  useEffect(() => {
    if (certification) {
      reset({
        id: certification.id,
        title: certification.title,
        issuer: certification.issuer,
        year: certification.year,
        description: certification.description,
        credential: certification.credential,
        link: certification.link,
      });
    }
  }, [certification, reset]);

  const onSubmit = (values: UpdateCertificationFormValues) => {
    setError("");
    startTransition(() => {
      updateCertification(values).then((data) => {
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
    <CrudModal isOpen={isOpen} onClose={onClose} title="Edit Certification">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="title-edit-cert" className="block text-sm font-medium text-muted-foreground mb-1">Title</label>
              <input id="title-edit-cert" {...register("title")} className="w-full input-style" />
              {errors.title && <p className="form-error">{errors.title.message}</p>}
            </div>
            <div>
              <label htmlFor="issuer-edit-cert" className="block text-sm font-medium text-muted-foreground mb-1">Issuer</label>
              <input id="issuer-edit-cert" {...register("issuer")} className="w-full input-style" />
              {errors.issuer && <p className="form-error">{errors.issuer.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="year-edit-cert" className="block text-sm font-medium text-muted-foreground mb-1">Year</label>
              <input id="year-edit-cert" {...register("year")} className="w-full input-style" />
              {errors.year && <p className="form-error">{errors.year.message}</p>}
            </div>
              <div>
              <label htmlFor="credential-edit-cert" className="block text-sm font-medium text-muted-foreground mb-1">Credential ID</label>
              <input id="credential-edit-cert" {...register("credential")} className="w-full input-style" />
              {errors.credential && <p className="form-error">{errors.credential.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="link-edit-cert" className="block text-sm font-medium text-muted-foreground mb-1">Verification Link</label>
            <input id="link-edit-cert" {...register("link")} className="w-full input-style" />
            {errors.link && <p className="form-error">{errors.link.message}</p>}
          </div>
          <div>
            <label htmlFor="description-edit-cert" className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
            <textarea id="description-edit-cert" {...register("description")} rows={3} className="w-full input-style" />
            {errors.description && <p className="form-error">{errors.description.message}</p>}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <FormButtons onClose={onClose} isPending={isPending} submitText="Update Certification" />
        </form>
    </CrudModal>
  );
};