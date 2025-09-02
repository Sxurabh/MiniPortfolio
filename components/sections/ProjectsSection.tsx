"use client"
import React, { useState } from "react"
import { Github, ExternalLink } from "lucide-react"
import type { Project } from "@/lib/types"

const PROJECTS_PER_PAGE = 4

interface ProjectsSectionProps {
    allProjects: Project[];
}

export const ProjectsSection = React.forwardRef<HTMLElement, ProjectsSectionProps>(({ allProjects }, ref) => {
  const [projectsPage, setProjectsPage] = useState(1)

  const getPaginatedProjects = () => {
    const startIndex = (projectsPage - 1) * PROJECTS_PER_PAGE
    return allProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE)
  }

  const totalPages = Math.ceil(allProjects.length / PROJECTS_PER_PAGE)

  return (
    <section id="projects" ref={ref} className="min-h-screen py-32 opacity-0">
      <div className="space-y-16">
        <div className="flex items-end justify-between">
          <h2 className="text-4xl font-light">Featured Projects</h2>
          <div className="text-sm text-muted-foreground font-mono">
            {(projectsPage - 1) * PROJECTS_PER_PAGE + 1}-
            {Math.min(projectsPage * PROJECTS_PER_PAGE, allProjects.length)} of {allProjects.length}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {getPaginatedProjects().map((project, index) => (
            <article
              key={index}
              className="group p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground font-mono">{project.year}</div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm focus:outline-none focus:ring-1 focus:ring-muted-foreground/40"
                      aria-label="View GitHub repository"
                    >
                      <Github className="h-4 w-4 text-muted-foreground group-hover/btn:text-foreground transition-colors duration-300" />
                      <span className="sr-only">GitHub</span>
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm focus:outline-none focus:ring-1 focus:ring-muted-foreground/40"
                      aria-label="View live project"
                    >
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover/btn:text-foreground transition-colors duration-300" />
                      <span className="sr-only">Open live project</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-3 py-1 text-xs leading-none whitespace-nowrap border border-border/70 rounded-full text-muted-foreground hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setProjectsPage(Math.max(1, projectsPage - 1))}
              disabled={projectsPage === 1}
              className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setProjectsPage(page)}
                  className={`w-8 h-8 rounded-lg border transition-all duration-300 text-sm ${
                    page === projectsPage
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
});

ProjectsSection.displayName = "ProjectsSection";