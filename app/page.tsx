import { PrismaClient } from '@prisma/client'
import PortfolioClient from "@/components/PortfolioClient"
import type { SocialLink } from '@/lib/types'

// Instantiate Prisma Client
const prisma = new PrismaClient()

// Social links can remain static as they don't change often.
// We define them here directly.
const socialLinks: SocialLink[] = [
  { name: "GitHub", handle: "@Sxurabh", url: "https://github.com/Sxurabh" },
  { name: "Twitter", handle: "@sxurxbh", url: "https://x.com/sxurxbh" },
  { name: "LinkedIn", handle: "saurabhkirve", url: "https://www.linkedin.com/in/saurabhkirve/" },
  { name: "Instagram", handle: "whosaurabh", url: "https://www.instagram.com/whosaurabh/" },
];

export default async function Home() {
  // This is a Server Component. It fetches data directly from your NeonDB.
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

  // The fetched data and the static social links are passed as props to the Client Component.
  return (
    <PortfolioClient
        allProjects={allProjects}
        allCertifications={allCertifications}
        allThoughts={allThoughts}
        workExperience={workExperience}
        socialLinks={socialLinks}
    />
  )
}

