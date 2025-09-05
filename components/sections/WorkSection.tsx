"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import type { WorkExperience } from "@/lib/types";
import { AddWorkModal } from "@/components/modals/AddWorkModal";
import { EditWorkModal } from "@/components/modals/EditWorkModal";
import { DeleteWorkModal } from "@/components/modals/DeleteWorkModal";
import { Edit, Trash2 } from "lucide-react";
import { GenericCrudSection } from "./GenericCrudSection";

interface WorkSectionProps {
  workExperience: WorkExperience[];
}

export const WorkSection = React.forwardRef<HTMLElement, WorkSectionProps>(
  ({ workExperience }, ref) => {
    const { data: session } = useSession();
    const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedWork, setSelectedWork] = useState<WorkExperience | null>(null);

    const handleEditClick = (job: WorkExperience) => {
      setSelectedWork(job);
      setIsEditModalOpen(true);
    };

    const handleDeleteClick = (job: WorkExperience) => {
      setSelectedWork(job);
      setIsDeleteModalOpen(true);
    };
    
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
                  <button onClick={() => handleEditClick(job)} className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDeleteClick(job)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            )}
        </div>
    );

    const renderModals = () => (
      <>
        <AddWorkModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        <EditWorkModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} workExperience={selectedWork} />
        <DeleteWorkModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} workExperienceId={selectedWork?.id ?? null} />
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
        onAddItem={() => setIsAddModalOpen(true)}
        itemsPerPage={3}
      />
    );
  }
);

WorkSection.displayName = "WorkSection";