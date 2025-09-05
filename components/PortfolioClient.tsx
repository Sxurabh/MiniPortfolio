"use client"

import React, { useEffect, useRef, useState } from "react"
import { Nav } from "@/components/Nav"
import { IntroSection } from "@/components/sections/IntroSection"
import { WorkSection } from "@/components/sections/WorkSection"
import { ProjectsSection } from "@/components/sections/ProjectsSection"
import { CertificationsSection } from "@/components/sections/CertificationsSection"
import { ThoughtsSection } from "@/components/sections/ThoughtsSection"
import { ConnectSection } from "@/components/sections/ConnectSection"
import { Footer } from "@/components/Footer"
import type { Session } from "next-auth"
import type { Project, Certification, Thought, WorkExperience, SocialLink } from '@/lib/types'

interface PortfolioClientProps {
    session: Session | null;
    allProjects: Project[];
    allCertifications: Certification[];
    allThoughts: Thought[];
    workExperience: WorkExperience[];
    socialLinks: SocialLink[];
    cvExists: boolean;
}

export default function PortfolioClient({
    session,
    allProjects,
    allCertifications,
    allThoughts,
    workExperience,
    socialLinks,
    cvExists
}: PortfolioClientProps) {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("intro")
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.style.transition = "background-color 0.2s ease, color 0.2s ease"
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

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

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative transition-all duration-500">
      <Nav activeSection={activeSection} />

      <main className="max-w-4xl mx-auto px-8 lg:px-16">
        <IntroSection ref={(el) => {sectionRefs.current[0] = el}} isDark={isDark} toggleTheme={toggleTheme} cvExists={cvExists} />
        <WorkSection ref={(el) => {sectionRefs.current[1] = el}} workExperience={workExperience} />
        <ProjectsSection ref={(el) => {sectionRefs.current[2] = el}} allProjects={allProjects} />
        <CertificationsSection ref={(el) => {sectionRefs.current[3] = el}} allCertifications={allCertifications} />
        <ThoughtsSection ref={(el) => {sectionRefs.current[4] = el}} allThoughts={allThoughts} />
        <ConnectSection ref={(el) => {sectionRefs.current[5] = el}} socialLinks={socialLinks} />
        <Footer />
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}