"use client";

import React, { useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { certificationSchema, updateCertificationSchema, type CertificationFormValues, type UpdateCertificationFormValues } from "@/lib/schemas";
import { addCertification, updateCertification } from "@/actions/certification";
import type { Certification } from "@/lib/types";
import { toast } from "sonner";
import { CrudModal } from "./CrudModal";
import { FormButtons } from "./FormButtons";

interface CertificationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  certification: Certification | null;
}

export const CertificationFormModal = ({ isOpen, onClose, certification }: CertificationFormModalProps) => {
  const isEditMode = certification !== null;
  const [isPending, startTransition] = useTransition();

  const form = useForm<CertificationFormValues | UpdateCertificationFormValues>({
    resolver: zodResolver(isEditMode ? updateCertificationSchema : certificationSchema),
    defaultValues: isEditMode ? certification : {},
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(isEditMode ? certification! : {});
    }
  }, [isOpen, certification, isEditMode, form]);

  const onSubmit = (values: CertificationFormValues | UpdateCertificationFormValues) => {
    startTransition(() => {
      const action = isEditMode
        ? updateCertification(values as UpdateCertificationFormValues)
        : addCertification(values as CertificationFormValues);

      action.then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          onClose();
        }
      });
    });
  };

  return (
    <CrudModal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Certification" : "Add New Certification"}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title-cert" className="block text-sm font-medium text-muted-foreground mb-1">Title</label>
            <input id="title-cert" {...form.register("title")} className="w-full input-style" />
            {form.formState.errors.title && <p className="form-error">{form.formState.errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="issuer-cert" className="block text-sm font-medium text-muted-foreground mb-1">Issuer</label>
            <input id="issuer-cert" {...form.register("issuer")} className="w-full input-style" />
            {form.formState.errors.issuer && <p className="form-error">{form.formState.errors.issuer.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="year-cert" className="block text-sm font-medium text-muted-foreground mb-1">Year</label>
            <input id="year-cert" {...form.register("year")} className="w-full input-style" />
            {form.formState.errors.year && <p className="form-error">{form.formState.errors.year.message}</p>}
          </div>
            <div>
            <label htmlFor="credential-cert" className="block text-sm font-medium text-muted-foreground mb-1">Credential ID</label>
            <input id="credential-cert" {...form.register("credential")} className="w-full input-style" />
            {form.formState.errors.credential && <p className="form-error">{form.formState.errors.credential.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="link-cert" className="block text-sm font-medium text-muted-foreground mb-1">Verification Link</label>
          <input id="link-cert" {...form.register("link")} className="w-full input-style" />
          {form.formState.errors.link && <p className="form-error">{form.formState.errors.link.message}</p>}
        </div>
        <div>
          <label htmlFor="description-cert" className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
          <textarea id="description-cert" {...form.register("description")} rows={3} className="w-full input-style" />
          {form.formState.errors.description && <p className="form-error">{form.formState.errors.description.message}</p>}
        </div>
        <FormButtons onClose={onClose} isPending={isPending} submitText={isEditMode ? "Update Certification" : "Save Certification"} />
      </form>
    </CrudModal>
  );
};