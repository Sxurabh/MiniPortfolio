import { PrismaClient } from '@prisma/client'
import PortfolioClient from "@/components/PortfolioClient"
import type { SocialLink } from '@/lib/types'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient()

const socialLinks: SocialLink[] = [
  { name: "GitHub", handle: "@Sxurabh", url: "https://github.com/Sxurabh" },
  { name: "Twitter", handle: "@sxurxbh", url: "https://x.com/sxurxbh" },
  { name: "LinkedIn", handle: "saurabhkirve", url: "https://www.linkedin.com/in/saurabhkirve/" },
  { name: "Instagram", handle: "whosaurabh", url: "https://www.instagram.com/whosaurabh/" },
];

export default async function Home() {
  const session = await getServerSession(authOptions);

  const allProjects = await prisma.project.findMany({
    orderBy: { year: 'desc' }
  });
  const allCertifications = await prisma.certification.findMany({
    orderBy: { year: 'desc' }
  });
  const allThoughts = await prisma.thought.findMany({
    orderBy: { createdAt: 'desc' }
  });
  const workExperience = await prisma.workExperience.findMany({
    orderBy: { year: 'desc' }
  });

  const cvFilePath = path.join(process.cwd(), "public", "cv-saurabh-kirve.pdf");
  let cvExists = false;
  try {
    await fs.access(cvFilePath);
    cvExists = true;
  } catch (error) {
    // File doesn't exist
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
    />
  )
}