// sxurabh/miniportfolio/MiniPortfolio-Experimental-Branch/components/features/Projects/ProjectsSection.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Github, ExternalLink, Edit, Trash2, Loader2 } from "lucide-react";
import type { Project } from "@/lib/types";
import { DeleteConfirmationModal } from "@/components/common/DeleteConfirmationModal";
import { deleteProject } from "@/actions/project";
import { fetchPaginatedProjects } from "@/actions/fetchPaginatedData";
import { GenericCrudSection } from "@/components/sections/GenericCrudSection";
import { useCrudState } from "@/hooks/use-crud-state";
import { useIsAdmin } from "@/hooks/use-is-admin";

const ProjectFormModal = dynamic(() => 
  import("./ProjectFormModal").then((mod) => mod.ProjectFormModal),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    ),
  }
);

interface ProjectsSectionProps {
  allProjects: Project[];
  totalItems: number;
}

export const ProjectsSection = React.forwardRef<HTMLElement, ProjectsSectionProps>(
  ({ allProjects, totalItems }, ref) => {
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
    } = useCrudState<Project>();
    
    const itemsPerPage = 4;

    const renderItem = (project: Project) => {
      // --- NEW: Logic to check if the project is recent ---
      const now = new Date();
      const currentYear = now.getFullYear().toString();
      const isCurrentYear = project.year.trim() === currentYear;

      const projectDate = new Date(project.createdAt);
      const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;
      const isRecentlyAdded = (now.getTime() - projectDate.getTime()) < oneMonthInMs;

      const isNew = isCurrentYear && isRecentlyAdded;

      return (
        <article key={project.id} className="group relative flex flex-col h-full p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg">
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xs text-muted-foreground font-mono">{project.year}</div>
              <div className="flex items-center gap-3">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300" aria-label="GitHub"><Github className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" /></a>
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300" aria-label="Live link"><ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" /></a>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-medium">{project.title}</h3>
                {/* --- NEW: Conditionally render the "New" tag --- */}
                {isNew && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-teal-400/50 text-teal-600 dark:border-teal-500/50 dark:text-teal-400">
                    New
                  </span>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed mt-1">{project.description}</p>
            </div>
          </div>
          <div className="mt-auto pt-6">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="inline-flex items-center px-3 py-1 text-xs leading-none whitespace-nowrap border border-border/70 rounded-full text-muted-foreground">{tech}</span>
              ))}
            </div>
            {isAdmin && (
              <div className="absolute bottom-4 right-4 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => handleEditItem(project)} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Edit project"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDeleteItem(project)} className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Delete project"><Trash2 className="w-4 h-4" /></button>
              </div>
            )}
          </div>
        </article>
      );
    }

    const renderModals = () => (
      <>
        {isFormModalOpen && (
          <ProjectFormModal 
            isOpen={isFormModalOpen} 
            onClose={closeFormModal} 
            project={selectedItem} 
          />
        )}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={async () => {
            if (!selectedItem) return;
            return deleteProject(selectedItem.id);
          }}
          itemName="project"
        />
      </>
    );

    return (
      <GenericCrudSection
        id="projects"
        ref={ref}
        title="Featured Projects"
        items={allProjects}
        totalItems={totalItems}
        renderItem={renderItem}
        renderModals={renderModals}
        onAddItem={handleAddItem}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => fetchPaginatedProjects(page, itemsPerPage)}
        gridClass="grid lg:grid-cols-2 gap-8"
      />
    );
  }
);

ProjectsSection.displayName = "ProjectsSection";