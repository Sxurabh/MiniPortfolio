import { PrismaClient } from '@prisma/client'
import PortfolioClient from "@/components/PortfolioClient"
import type { SocialLink } from '@/lib/types'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

const socialLinks: SocialLink[] = [
  { name: "GitHub", handle: "@Sxurabh", url: "https://github.com/Sxurabh" },
  { name: "Twitter", handle: "@sxurxbh", url: "https://x.com/sxurxbh" },
  { name: "LinkedIn", handle: "saurabhkirve", url: "https://www.linkedin.com/in/saurabhkirve/" },
  { name: "Instagram", handle: "whosaurabh", url: "https://www.instagram.com/whosaurabh/" },
];

export default async function Home() {
  // Fetch the session on the server using getServerSession 
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

  return (
    <PortfolioClient
        session={session}
        allProjects={allProjects}
        allCertifications={allCertifications}
        allThoughts={allThoughts}
        workExperience={workExperience}
        socialLinks={socialLinks}
    />
  )
}
