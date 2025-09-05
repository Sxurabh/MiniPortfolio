"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Github, ExternalLink, Edit, Trash2 } from "lucide-react";
import type { Project } from "@/lib/types";
import { AddProjectModal } from "@/components/modals/AddProjectModal";
import { EditProjectModal } from "@/components/modals/EditProjectModal";
import { DeleteProjectModal } from "@/components/modals/DeleteProjectModal";

const PROJECTS_PER_PAGE = 4;

interface ProjectsSectionProps {
  allProjects: Project[];
}

export const ProjectsSection = React.forwardRef<
  HTMLElement,
  ProjectsSectionProps
>(({ allProjects }, ref) => {
  const { data: session } = useSession();
  const [projectsPage, setProjectsPage] = useState(1);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const getPaginatedProjects = () => {
    const startIndex = (projectsPage - 1) * PROJECTS_PER_PAGE;
    return allProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  };

  const totalPages = Math.ceil(allProjects.length / PROJECTS_PER_PAGE);

  return (
    <>
      <AddProjectModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditProjectModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} project={selectedProject} />
      <DeleteProjectModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} projectId={selectedProject?.id ?? null} />

      <section id="projects" ref={ref} className="min-h-screen py-32 opacity-0">
        <div className="space-y-16">
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-light">Featured Projects</h2>
              {isAdmin && (
                <button 
                  onClick={() => setIsAddModalOpen(true)} 
                  className="px-3 py-1.5 text-xs rounded-md border border-border hover:border-muted-foreground/50 transition-colors"
                >
                  Add New Project
                </button>
              )}
            </div>
            <div className="text-sm text-muted-foreground font-mono">
              {(projectsPage - 1) * PROJECTS_PER_PAGE + 1}-
              {Math.min(projectsPage * PROJECTS_PER_PAGE, allProjects.length)} of {allProjects.length}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {getPaginatedProjects().map((project) => (
              <article key={project.id} className="group relative flex flex-col h-full p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg">
                {/* Main Content Area */}
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

                {/* Tags and Admin Buttons Area */}
                <div className="mt-auto pt-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="inline-flex items-center px-3 py-1 text-xs leading-none whitespace-nowrap border border-border/70 rounded-full text-muted-foreground">{tech}</span>
                    ))}
                  </div>
                  
                  {/* Admin controls that appear on hover */}
                  {isAdmin && (
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={() => handleEditClick(project)} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Edit project"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteClick(project)} className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Delete project"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-8">
              <button
                onClick={() => setProjectsPage(Math.max(1, projectsPage - 1))}
                disabled={projectsPage === 1}
                className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setProjectsPage(page)}
                    className={`w-8 h-8 rounded-lg border transition-all duration-300 text-sm ${page === projectsPage ? "border-foreground bg-foreground text-background" : "border-border hover:border-muted-foreground/50"}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setProjectsPage(Math.min(totalPages, projectsPage + 1))}
                disabled={projectsPage === totalPages}
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
});

ProjectsSection.displayName = "ProjectsSection";