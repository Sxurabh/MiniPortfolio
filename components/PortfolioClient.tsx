// sxurabh/miniportfolio/MiniPortfolio-ExperimentalBranch/components/PortfolioClient.tsx
"use client"

import React, { useRef, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Nav } from "@/components/Nav"
import { IntroSection } from "@/components/features/Intro/IntroSection" // Assuming you also moved IntroSection
import type { Session } from "next-auth"
import type { Project, Certification, Thought, WorkExperience, SocialLink } from '@/lib/types'

// Dynamically import sections from their 'features' directory
const WorkSection = dynamic(() => import('@/components/features/Work/WorkSection').then(mod => mod.WorkSection));
const ProjectsSection = dynamic(() => import('@/components/features/Projects/ProjectsSection').then(mod => mod.ProjectsSection));
const CertificationsSection = dynamic(() => import('@/components/features/Certifications/CertificationsSection').then(mod => mod.CertificationsSection));
const ThoughtsSection = dynamic(() => import('@/components/features/Thoughts/ThoughtsSection').then(mod => mod.ThoughtsSection));
const ConnectSection = dynamic(() => import('@/components/features/Connect/ConnectSection').then(mod => mod.ConnectSection)); // It's good practice to move all sections
const Footer = dynamic(() => import('@/components/Footer').then(mod => mod.Footer));


interface PortfolioClientProps {
    session: Session | null;
    allProjects: Project[];
    allCertifications: Certification[];
    allThoughts: Thought[];
    workExperience: WorkExperience[];
    socialLinks: SocialLink[];
    cvExists: boolean;
    cvUrl: string; // <-- ADD THIS LINE
}

export default function PortfolioClient({
    session,
    allProjects,
    allCertifications,
    allThoughts,
    workExperience,
    socialLinks,
    cvExists,
    cvUrl // <-- ADD THIS LINE
}: PortfolioClientProps) {
  const [activeSection, setActiveSection] = useState("intro")
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            setActiveSection(entry.target.id);
            // Stop observing the element once it has animated in to improve performance
            observer.unobserve(entry.target);
          }
        });
      },
      // Lower threshold to trigger animation sooner on all devices
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

  return (
    <div className="min-h-screen bg-background text-foreground relative transition-colors duration-500">
      <Nav activeSection={activeSection} />

      <main className="max-w-4xl mx-auto px-8 lg:px-16">
        <IntroSection ref={(el) => {sectionRefs.current[0] = el}} cvExists={cvExists} cvUrl={cvUrl} />
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