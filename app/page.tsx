import PortfolioClient from "@/components/PortfolioClient"
import {
    allProjects,
    allCertifications,
    allThoughts,
    workExperience,
    socialLinks
} from "@/lib/data"

export default function Home() {
  // This is a Server Component. It fetches data and passes it down.
  // In the future, this data could come from a database or a CMS.
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