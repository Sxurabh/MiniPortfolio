"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import type { WorkExperience } from "@/lib/types";
import { AddWorkModal } from "@/components/modals/AddWorkModal";
import { EditWorkModal } from "@/components/modals/EditWorkModal";
import { DeleteWorkModal } from "@/components/modals/DeleteWorkModal";
import { Edit, Trash2 } from "lucide-react";

interface WorkSectionProps {
  workExperience: WorkExperience[];
}

export const WorkSection = React.forwardRef<HTMLElement, WorkSectionProps>(
  ({ workExperience }, ref) => {
    const { data: session } = useSession();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedWork, setSelectedWork] = useState<WorkExperience | null>(null);

    const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    const handleEditClick = (job: WorkExperience) => {
      setSelectedWork(job);
      setIsEditModalOpen(true);
    };

    const handleDeleteClick = (job: WorkExperience) => {
      setSelectedWork(job);
      setIsDeleteModalOpen(true);
    };
    
    return (
      <>
        <AddWorkModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        <EditWorkModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} workExperience={selectedWork} />
        <DeleteWorkModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} workExperienceId={selectedWork?.id ?? null} />

        <section id="work" ref={ref} className="min-h-screen py-32 opacity-0">
          <div className="space-y-16">
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-4xl font-light">Selected Work</h2>
                {isAdmin && (
                  <button onClick={() => setIsAddModalOpen(true)} className="px-3 py-1.5 text-xs rounded-md border border-border hover:border-muted-foreground/50 transition-colors">
                    Add New Work
                  </button>
                )}
              </div>
              <div className="text-sm text-muted-foreground font-mono">2022 — 2025</div>
            </div>

            <div className="space-y-12">
              {workExperience.map((job) => (
                <div key={job.id} className="group grid lg:grid-cols-12 gap-8 py-8 border-b border-border/50 hover:border-border transition-colors duration-500">
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
                    <div className="lg:col-span-12 flex justify-end items-center gap-2 -mt-4">
                        <button onClick={() => handleEditClick(job)} className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteClick(job)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
);

WorkSection.displayName = "WorkSection";