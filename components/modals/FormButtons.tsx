"use client";

import React from "react";

interface FormButtonsProps {
  onClose: () => void;
  isPending: boolean;
  submitText: string;
}

export const FormButtons = ({ onClose, isPending, submitText }: FormButtonsProps) => {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-accent transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        {isPending ? "Saving..." : submitText}
      </button>
    </div>
  );
};