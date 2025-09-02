"use client"

import React from "react"

interface NavProps {
  activeSection: string
}

const sections = ["intro", "work", "projects", "certifications", "thoughts", "connect"]

export function Nav({ activeSection }: NavProps) {
  const handleNavClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => handleNavClick(section)}
            className={`w-2 h-8 rounded-full transition-all duration-500 ${
              activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
            aria-label={`Maps to ${section}`}
          />
        ))}
      </div>
    </nav>
  )
}