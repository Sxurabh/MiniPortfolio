"use client"

import React, { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Nav } from "@/components/Nav"
import { IntroSection } from "@/components/sections/IntroSection"
import type { Session } from "next-auth"
import type { Project, Certification, Thought, WorkExperience, SocialLink } from '@/lib/types'

// Dynamically import sections that are below the fold
const WorkSection = dynamic(() => import('@/components/sections/WorkSection').then(mod => mod.WorkSection));
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection').then(mod => mod.ProjectsSection));
const CertificationsSection = dynamic(() => import('@/components/sections/CertificationsSection').then(mod => mod.CertificationsSection));
const ThoughtsSection = dynamic(() => import('@/components/sections/ThoughtsSection').then(mod => mod.ThoughtsSection));
const ConnectSection = dynamic(() => import('@/components/sections/ConnectSection').then(mod => mod.ConnectSection));
const Footer = dynamic(() => import('@/components/Footer').then(mod => mod.Footer));


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
  const [activeSection, setActiveSection] = useState("intro")
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

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

  return (
    <div className="min-h-screen bg-background text-foreground relative transition-colors duration-500">
      <Nav activeSection={activeSection} />

      <main className="max-w-4xl mx-auto px-8 lg:px-16">
        <IntroSection ref={(el) => {sectionRefs.current[0] = el}} cvExists={cvExists} />
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