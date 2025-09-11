// sxurabh/miniportfolio/MiniPortfolio-ExperimentalBranch/app/page.tsx
import { PrismaClient } from '@prisma/client'
import PortfolioClient from "@/components/PortfolioClient"
import type { SocialLink } from '@/lib/types'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { head } from "@vercel/blob";

const prisma = new PrismaClient()

const socialLinks: SocialLink[] = [
  { name: "GitHub", handle: "@Sxurabh", url: "https://github.com/Sxurabh" },
  { name: "Twitter", handle: "@sxurxbh", url: "https://x.com/sxurxbh" },
  { name: "LinkedIn", handle: "saurabhkirve", url: "https://www.linkedin.com/in/saurabhkirve/" },
  { name: "Instagram", handle: "whosaurabh", url: "https://www.instagram.com/whosaurabh/" },
];

const CV_BLOB_PATHNAME = "cv-saurabh-kirve.pdf";

export default async function Home() {
  // Fetch all data in parallel for faster server response
  const [session, allProjects, allCertifications, allThoughts, workExperience] = await Promise.all([
    getServerSession(authOptions),
    prisma.project.findMany({ orderBy: { year: 'desc' } }),
    prisma.certification.findMany({ orderBy: { year: 'desc' } }),
    prisma.thought.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.workExperience.findMany({ orderBy: { year: 'desc' } })
  ]);

  let cvExists = false;
  let cvUrl = "";

  try {
    const blob = await head(CV_BLOB_PATHNAME);
    cvExists = true;
    cvUrl = blob.url; // <-- ADD THIS LINE to get the public URL
  } catch (error: any) {
    if (!(error instanceof Error && error.message.includes("The requested blob does not exist"))) {
      console.error("Error checking for CV blob:", error);
    }
  }

  return (
    <PortfolioClient
        session={session}
        allProjects={allProjects}
        allCertifications={allCertifications}
        allThoughts={allThoughts}
        workExperience={workExperience}
        socialLinks={socialLinks}
        cvExists={cvExists}
        cvUrl={cvUrl} // <-- PASS THE URL AS A PROP
    />
  )
}