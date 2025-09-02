import React from "react"
import type { WorkExperience } from "@/lib/types";

interface WorkSectionProps {
    workExperience: WorkExperience[];
}

export const WorkSection = React.forwardRef<HTMLElement, WorkSectionProps>(({ workExperience }, ref) => {
  return (
    <section id="work" ref={ref} className="min-h-screen py-32 opacity-0">
      <div className="space-y-16">
        <div className="flex items-end justify-between">
          <h2 className="text-4xl font-light">Selected Work</h2>
          <div className="text-sm text-muted-foreground font-mono">2022 — 2025</div>
        </div>

        <div className="space-y-12">
          {workExperience.map((job, index) => (
            <div
              key={index}
              className="group grid lg:grid-cols-12 gap-8 py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
            >
              <div className="lg:col-span-2">
                <div className="font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500 text-base">
                  {job.year}
                </div>
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
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1 text-xs leading-none whitespace-nowrap border border-border rounded-lg text-muted-foreground hover:border-muted-foreground/50 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
});

WorkSection.displayName = "WorkSection";