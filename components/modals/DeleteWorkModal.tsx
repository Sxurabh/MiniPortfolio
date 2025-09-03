"use client";

import React, { useTransition } from "react";
import { deleteWorkExperience } from "@/actions/work";

interface DeleteWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  workExperienceId: number | null;
}

export const DeleteWorkModal = ({ isOpen, onClose, workExperienceId }: DeleteWorkModalProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!workExperienceId) return;
    startTransition(() => {
      deleteWorkExperience(workExperienceId).then(() => {
        onClose();
      });
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-md p-8 space-y-6 bg-background border border-border rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold">Are you sure?</h3>
        <p className="text-sm text-muted-foreground">This action cannot be undone. This will permanently delete this work experience entry.</p>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-accent transition-colors">Cancel</button>
          <button onClick={handleDelete} disabled={isPending} className="px-4 py-2 text-sm font-medium text-destructive-foreground bg-destructive rounded-md hover:bg-destructive/90 disabled:opacity-50 transition-colors">
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};