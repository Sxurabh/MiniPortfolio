"use client";

import React, { useState } from "react";
import { Github, ExternalLink, Edit, Trash2 } from "lucide-react";
import type { Project } from "@/lib/types";
import { AddProjectModal } from "@/components/modals/AddProjectModal";
import { EditProjectModal } from "@/components/modals/EditProjectModal";
import { DeleteProjectModal } from "@/components/modals/DeleteProjectModal";
import { GenericCrudSection } from "./GenericCrudSection";

interface ProjectsSectionProps {
  allProjects: Project[];
}

export const ProjectsSection = React.forwardRef<HTMLElement, ProjectsSectionProps>(
  ({ allProjects }, ref) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleEditClick = (project: Project) => {
      setSelectedProject(project);
      setIsEditModalOpen(true);
    };

    const handleDeleteClick = (project: Project) => {
      setSelectedProject(project);
      setIsDeleteModalOpen(true);
    };

    const renderItem = (project: Project) => (
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
            <h3 className="text-xl font-medium">{project.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>
        </div>
        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="inline-flex items-center px-3 py-1 text-xs leading-none whitespace-nowrap border border-border/70 rounded-full text-muted-foreground">{tech}</span>
            ))}
          </div>
          <div className="absolute bottom-4 right-4 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button onClick={() => handleEditClick(project)} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Edit project"><Edit className="w-4 h-4" /></button>
              <button onClick={() => handleDeleteClick(project)} className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Delete project"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>
      </article>
    );

    const renderModals = () => (
      <>
        <AddProjectModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        <EditProjectModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} project={selectedProject} />
        <DeleteProjectModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} projectId={selectedProject?.id ?? null} />
      </>
    );

    return (
      <GenericCrudSection
        id="projects"
        ref={ref}
        title="Featured Projects"
        items={allProjects}
        renderItem={renderItem}
        renderModals={renderModals}
        onAddItem={() => setIsAddModalOpen(true)}
        itemsPerPage={4}
        gridClass="grid lg:grid-cols-2 gap-8"
      />
    );
  }
);

ProjectsSection.displayName = "ProjectsSection";