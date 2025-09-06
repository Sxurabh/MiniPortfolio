"use client";

import React from "react";
import type { WorkExperience } from "@/lib/types";
import { WorkFormModal } from "./WorkFormModal";
import { DeleteConfirmationModal } from "@/components/common/DeleteConfirmationModal";
import { deleteWorkExperience } from "@/actions/work";
import { Edit, Trash2 } from "lucide-react";
import { GenericCrudSection } from "../../sections/GenericCrudSection";
import { useCrudState } from "@/hooks/use-crud-state";
import { useIsAdmin } from "@/hooks/use-is-admin";

interface WorkSectionProps {
  workExperience: WorkExperience[];
}

export const WorkSection = React.forwardRef<HTMLElement, WorkSectionProps>(
  ({ workExperience }, ref) => {
    const isAdmin = useIsAdmin();
    const {
      isFormModalOpen,
      isDeleteModalOpen,
      selectedItem,
      handleAddItem,
      handleEditItem,
      handleDeleteItem,
      closeFormModal,
      closeDeleteModal,
    } = useCrudState<WorkExperience>();
    
    const renderItem = (job: WorkExperience) => (
        <div key={job.id} className="group grid lg:grid-cols-12 gap-8 py-8 border-b border-border/50 hover:border-border transition-colors duration-500 relative">
            <div className="lg:col-span-2">
                <div className="font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500 text-base">{job.year}</div>
            </div>
            <div className="lg:col-span-6 space-y-3">
                <div>
                    <h3 className="text-xl font-medium">{job.role}</h3>
                    <div className="text-muted-foreground">{job.company}</div>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap items-start gap-3 lg:justify-end">
                {job.tech.map((tech) => (
                    <span key={tech} className="inline-flex items-center px-3 py-1 text-xs leading-none whitespace-nowrap border border-border rounded-lg text-muted-foreground hover:border-muted-foreground/50 transition-colors duration-300">
                        {tech}
                    </span>
                ))}
            </div>
            {isAdmin && (
              <div className="absolute bottom-4 right-0 flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => handleEditItem(job)} className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDeleteItem(job)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            )}
        </div>
    );

    const renderModals = () => (
      <>
        <WorkFormModal
          isOpen={isFormModalOpen}
          onClose={closeFormModal}
          workExperience={selectedItem}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={async () => {
            if (!selectedItem) return;
            return deleteWorkExperience(selectedItem.id);
          }}
          itemName="work experience"
        />
      </>
    );

    return (
      <GenericCrudSection
        id="work"
        ref={ref}
        title="Selected Work"
        items={workExperience}
        renderItem={renderItem}
        renderModals={renderModals}
        onAddItem={handleAddItem}
        itemsPerPage={3}
      />
    );
  }
);

WorkSection.displayName = "WorkSection";