// sxurabh/miniportfolio/MiniPortfolio-ExperimentalBranch/components/PortfolioClient.tsx
"use client"

import React, { useRef, useEffect, useState } from "react"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

interface PortfolioClientProps {
    children: React.ReactNode;
}

export default function PortfolioClient({ children }: PortfolioClientProps) {
  const [activeSection, setActiveSection] = useState("intro")
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id || "intro";
            entry.target.classList.add("animate-fade-in-up");
            setActiveSection(sectionId);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    const currentRefs = sectionRefs.current
    currentRefs.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      currentRefs.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  const sections = React.Children.toArray(children);

  return (
    <div className="min-h-screen bg-background text-foreground relative transition-colors duration-500">
      <Nav activeSection={activeSection} />

      <main className="max-w-4xl mx-auto px-8 lg:px-16">
        {sections.map((section, index) =>
          React.isValidElement(section)
            ? React.cloneElement(section as React.ReactElement<any>, {
                ref: (el: HTMLElement | null) => (sectionRefs.current[index] = el),
              })
            : section
        )}
        <Footer />
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}