"use client";

import React, { type ReactNode } from "react";
import { X } from "lucide-react";

interface CrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode; // This will be the form
}

export const CrudModal = ({ isOpen, onClose, title, children }: CrudModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg p-8 space-y-6 bg-background border border-border rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-muted-foreground hover:bg-accent transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};