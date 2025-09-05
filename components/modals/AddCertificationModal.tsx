"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { certificationSchema, type CertificationFormValues } from "@/lib/schemas";
import { addCertification } from "@/actions/certification";
import { toast } from "sonner";
import { CrudModal } from "./CrudModal";
import { FormButtons } from "./FormButtons";

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
    <CrudModal isOpen={isOpen} onClose={onClose} title="Add New Certification">
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
        <FormButtons onClose={onClose} isPending={isPending} submitText="Save Certification" />
      </form>
    </CrudModal>
  );
};