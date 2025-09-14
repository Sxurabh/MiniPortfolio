// sxurabh/miniportfolio/MiniPortfolio-ExperimentalBranch/app/page.tsx
import { PrismaClient } from '@prisma/client'
import PortfolioClient from "@/components/PortfolioClient"
import type { SocialLink } from '@/lib/types'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { head } from "@vercel/blob";
import { IntroSection } from "@/components/features/Intro/IntroSection"
import { WorkSection } from "@/components/features/Work/WorkSection"
import { ProjectsSection } from "@/components/features/Projects/ProjectsSection"
import { CertificationsSection } from "@/components/features/Certifications/CertificationsSection"
import { ThoughtsSection } from "@/components/features/Thoughts/ThoughtsSection"
import { ConnectSection } from "@/components/features/Connect/ConnectSection"

// Revalidate the page every hour.
export const revalidate = 3600;

const prisma = new PrismaClient()

const socialLinks: SocialLink[] = [
  { name: "GitHub", handle: "@Sxurabh", url: "https://github.com/Sxurabh" },
  { name: "Twitter", handle: "@sxurxbh", url: "https://x.com/sxurxbh" },
  { name: "LinkedIn", handle: "saurabhkirve", url: "https://www.linkedin.com/in/saurabhkirve/" },
  { name: "Instagram", handle: "whosaurabh", url: "https://www.instagram.com/whosaurabh/" },
];

const CV_BLOB_PATHNAME = "cv-saurabh-kirve.pdf";

export default async function Home() {
  const [session, allProjects, projectsCount, allCertifications, certificationsCount, allThoughts, thoughtsCount, workExperience, workExperienceCount] = await Promise.all([
    getServerSession(authOptions),
    prisma.project.findMany({ 
      orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
      // --- CHANGE: Add createdAt to the select query ---
      select: { id: true, title: true, description: true, tech: true, github: true, live: true, year: true, createdAt: true },
      take: 4
    }),
    prisma.project.count(),
    prisma.certification.findMany({ 
      orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
      select: { id: true, year: true, title: true, issuer: true, description: true, credential: true, link: true, createdAt: true },
      take: 3
    }),
    prisma.certification.count(),
    prisma.thought.findMany({ 
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, excerpt: true, date: true, readTime: true, url: true },
      take: 4
    }),
    prisma.thought.count(),
    prisma.workExperience.findMany({ 
      orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
      select: { id: true, year: true, role: true, company: true, description: true, tech: true },
      take: 3
    }),
    prisma.workExperience.count(),
  ]);

  let cvExists = false;
  let cvUrl = "";

  try {
    const blob = await head(CV_BLOB_PATHNAME);
    cvExists = true;
    cvUrl = blob.url;
  } catch (error: any) {
    if (!(error instanceof Error && error.message.includes("The requested blob does not exist"))) {
      console.error("Error checking for CV blob:", error);
    }
  }

  return (
    <PortfolioClient>
      <IntroSection cvExists={cvExists} cvUrl={cvUrl} />
      <WorkSection workExperience={workExperience} totalItems={workExperienceCount} />
      <ProjectsSection allProjects={allProjects} totalItems={projectsCount} />
      <CertificationsSection allCertifications={allCertifications} totalItems={certificationsCount} />
      <ThoughtsSection allThoughts={allThoughts} totalItems={thoughtsCount} />
      <ConnectSection socialLinks={socialLinks} />
    </PortfolioClient>
  )
}