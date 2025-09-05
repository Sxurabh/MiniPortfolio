"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import type { WorkExperience } from "@/lib/types";
import { AddWorkModal } from "@/components/modals/AddWorkModal";
import { EditWorkModal } from "@/components/modals/EditWorkModal";
import { DeleteWorkModal } from "@/components/modals/DeleteWorkModal";
import { Edit, Trash2 } from "lucide-react";

const WORK_EXPERIENCE_PER_PAGE = 3;

interface WorkSectionProps {
  workExperience: WorkExperience[];
}

export const WorkSection = React.forwardRef<HTMLElement, WorkSectionProps>(
  ({ workExperience }, ref) => {
    const { data: session } = useSession();
    const [workPage, setWorkPage] = useState(1);
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

    const getPaginatedWork = () => {
      const startIndex = (workPage - 1) * WORK_EXPERIENCE_PER_PAGE;
      return workExperience.slice(startIndex, startIndex + WORK_EXPERIENCE_PER_PAGE);
    };

    const totalPages = Math.ceil(workExperience.length / WORK_EXPERIENCE_PER_PAGE);
    
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
              <div className="text-sm text-muted-foreground font-mono">
                {(workPage - 1) * WORK_EXPERIENCE_PER_PAGE + 1}-
                {Math.min(workPage * WORK_EXPERIENCE_PER_PAGE, workExperience.length)} of {workExperience.length}
              </div>
            </div>

            <div className="space-y-12">
              {getPaginatedWork().map((job) => (
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-8">
                <button
                  onClick={() => setWorkPage(Math.max(1, workPage - 1))}
                  disabled={workPage === 1}
                  className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setWorkPage(page)}
                      className={`w-8 h-8 rounded-lg border transition-all duration-300 text-sm ${page === workPage ? "border-foreground bg-foreground text-background" : "border-border hover:border-muted-foreground/50"}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setWorkPage(Math.min(totalPages, workPage + 1))}
                  disabled={workPage === totalPages}
                  className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            )}
          </div>
        </section>
      </>
    );
  }
);

WorkSection.displayName = "WorkSection";