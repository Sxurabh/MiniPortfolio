import type { Project, Certification, Thought, WorkExperience, SocialLink } from './types';

export const allProjects: Project[] = [
  {
    title: "Sales Dashboard",
    description:
      "I just wrapped up a small Excel project where I turned a mountain of raw sales data into a clean, interactive dashboard—all on one sheet",
    tech: ["MS-Excel", "DAX", "Pivot Table", "Excel formulas & functions"],
    github: "https://github.com/Sxurabh/excel-sales-dashboard",
    live: "https://onedrive.live.com/personal/b4f1a903f181abee/_layouts/15/Doc.aspx?sourcedoc=%7B17a610ad-f726-48c3-bb57-5d871b835ee0%7D&action=default&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3gvYy9iNGYxYTkwM2YxODFhYmVlL0VhMFFwaGNtOThOSXUxZGRoeHVEWHVBQjNGa1VpekpwaHh2QnpPQndMYThBQkE&slrid=2feebfa1-30ba-9000-f911-4c8be6d51636&originalPath=aHR0cHM6Ly8xZHJ2Lm1zL3gvYy9iNGYxYTkwM2YxODFhYmVlL0VhMFFwaGNtOThOSXUxZGRoeHVEWHVBQjNGa1VpekpwaHh2QnpPQndMYThBQkE_cnRpbWU9MzJ5cGdwVGwzVWc&CID=0b84c801-21e0-4a46-9a44-d5876c77ee2c&_SRM=0:G:51",
    year: "2025",
  },
  {
    title: "Personal Portfolio 2.0",
    description:
      "I built a thing! And by thing, I mean my brand new portfolio website — now live on the internet and (mostly) bug-free(just my another portfolio website)",
    tech: ["Next.js", "Prisma", "Tailwind CSS", "NeonDB"],
    github: "https://github.com/Sxurabh/PortfolioProMax",
    live: "https://saurabhkirve.vercel.app/",
    year: "2024",
  },
];

export const allCertifications: Certification[] = [
    {
      year: "2025",
      title: "Advanced SQL",
      issuer: "Kaggle",
      description:
        "This certification demonstrates expertise in complex data manipulation and query optimization. It covers advanced topics like using JOINs and UNIONs to combine data, applying analytic functions for sophisticated calculations, and writing efficient queries to reduce processing time. The course also focuses on tackling real-world data problems using practical application.",
      credential: "saurabhkirve",
      link: "https://www.kaggle.com/learn/certification/saurabhkirve/advanced-sql",
    },
    {
      year: "2025",
      title: "Lean Six Sigma White Belt Certification",
      issuer: "The Council for Six Sigma Certification (CSSC)",
      description:
        "This certification covers the foundational principles of Lean Six Sigma. It demonstrates an understanding of the DMAIC model (Define, Measure, Analyze, Improve, Control), which is a data-driven strategy for process improvement. The certification also covers the basic tools for quality control and root cause analysis, and introduces the roles and responsibilities of a Lean Six Sigma project team.",
      credential: "VXw40YCLDe",
      link: "https://certification.sixsigmacouncil.org/mod/customcert/verify_certificate.php?contextid=305",
    },
    {
      year: "2025",
      title: "Python (Basic)",
      issuer: "Hackerrank",
      description:
        "It covers topics like Scalar Types, Operators and Control Flow, Strings, Collections and Iteration, Modularity, Objects and Types and Classes",
      credential: "89b501615c71",
      link: "https://www.hackerrank.com/certificates/826925e46424",
    },
    {
      year: "2025",
      title: "R (Basic)",
      issuer: "Hackerrank",
      description:
        "This competency area includes fundamentals of the R programming language, understanding Data Frames, Packages, and Data Reshaping, using Data interfaces, among others.",
      credential: "826925e46424",
      link: "https://www.hackerrank.com/certificates/da447f3675aa",
    },
    {
      year: "2023",
      title: "CSS (Basic)",
      issuer: "Hackerrank",
      description:
        "It covers topics like exploring Cascading and Inheritance, exploring text styling fundamentals, understanding the use of layouts in CSS, understand the boxing of elements in CSS, among others.",
      credential: "da447f3675aa",
      link: "https://www.hackerrank.com/certificates/da447f3675aa",
    },
    {
      year: "2023",
      title: "Node (Basic)",
      issuer: "Hackerrank",
      description:
        "It covers topics like Package and Modules Management, Callbacks, Event Loop, Event Emitter, Buffers, Streams and File Systems",
      credential: "1daab744106c",
      link: "https://www.hackerrank.com/certificates/1daab744106c",
    },
    {
      year: "2023",
      title: "Certified Responsive Web Designer",
      issuer: "Freecodecamp.org",
      description:
        "As part of this certification, Saurabh Kirve built the projects and got all automated test suites to pass Certifications",
      credential: "sxurxbh",
      link: "https://www.freecodecamp.org/certification/sxurxbh/responsive-web-design",
    },
    {
      year: "2023",
      title: "SQL (Advanced)",
      issuer: "Hackerrank",
      description: "Developing and deploying applications on Azure platform.",
      credential: "5101a1843fd3",
      link: "https://www.hackerrank.com/certificates/5101a1843fd3",
    },
    {
      year: "2023",
      title: "SQL (Basic)",
      issuer: "Hackerrank",
      description: "It includes simple queries, relationships, and aggregators.",
      credential: "718d99941654",
      link: "https://www.hackerrank.com/certificates/718d99941654",
    },
    {
      year: "2020",
      title: "Academy Accreditation - Databricks Lakehouse Fundamentals",
      issuer: "Databricks",
      description:
        "Earners of the Lakehouse Fundamentals accreditation have demonstrated the understanding of fundamental concepts related to Databricks Lakehouse Platform.",
      credential: "103848782",
      link: "https://credentials.databricks.com/cf4c387e-3dc6-4943-9166-3a587eaa30d2#acc.5gIPfDby",
    },
];

export const allThoughts: Thought[] = [
    {
        title: "Vibe-coding is vibe",
        excerpt: "Exploring how AI and automation are reshaping the way we build for the web.",
        date: "Sept 2025",
        readTime: "10 min",
        url: "https://www.linkedin.com/posts/saurabhkirve_ai-vibecoding-nextjs-activity-7367834332675170304-sMSV?utm_source=share&utm_medium=member_desktop"
    },
    {
        title: "Project in R ecosystem",
        excerpt: "Just days after finishing my R basics certification, I was itching to build something tangible and entirely built in R ecosystem (I have never created any project in R before). I wanted to move from lessons to launching.",
        date: "Sept 2025",
        readTime: "8 min",
        url: "https://www.linkedin.com/posts/saurabhkirve_r-datascience-analytics-activity-7367834332675170304-sMSV?utm_source=share&utm_medium=member_desktop"
    },
    {
        title: "Job hunting automation",
        excerpt: "Recently, I completed a foundational Gen AI course with SG Analytics, in collaboration with upGrad and Microsoft. I always believe real world use is best way to implement any learning to understand it in deeper way that gave me the right prompting mindset—and since then, I’ve been testing prompts like a curious kid with unlimited ideas.",
        date: "Sept 2025",
        readTime: "6 min",
        url: "https://www.linkedin.com/posts/saurabhkirve_jobhunting-automation-ai-activity-7367834332675170304-sMSV?utm_source=share&utm_medium=member_desktop"
    },
    {
        title: "Lean Six Sigma Certification journey",
        excerpt: "A while back, I came across Lean Six Sigma and was intrigued by its potential to drive real, measurable improvements—even at the White Belt level. I'm happy to share that I've now completed the White Belt certification!",
        date: "Aug 2025",
        readTime: "4 min",
        url: "https://www.linkedin.com/posts/saurabhkirve_lean-six-sigma-certification-activity-7367834332675170304-sMSV?utm_source=share&utm_medium=member_desktop"
    }
];

export const workExperience: WorkExperience[] = [
  {
    year: "2023 - Present",
    role: "Associate Analyst",
    company: "SG Analytics - AI, Analytics & Data Firm, Pune",
    description:
      "Leveraged Python, Power BI, and Shell Scripting to analyze and map complex financial data for clients like Blackstone, SS&C, Citco, and BlackRock, ensuring accurate sourcing and insightful reporting from client documents",
    tech: ["Python", "SQL", "Power BI"],
  },
  {
    year: "2022 - 2023",
    role: "Analyst",
    company: "eClerx services, Pune",
    description:
      "Streamlined the client onboarding process by efficiently collecting and processing essential documentation, ensuring compliance with KYC and regulatory requirements",
    tech: ["SQL", "Web Chat", "MS - Excel"],
  },
];

export const socialLinks: SocialLink[] = [
  { name: "GitHub", handle: "@Sxurabh", url: "https://github.com/Sxurabh" },
  { name: "Twitter", handle: "@sxurxbh", url: "https://x.com/sxurxbh" },
  { name: "LinkedIn", handle: "saurabhkirve", url: "https://www.linkedin.com/in/saurabhkirve/" },
  { name: "Instagram", handle: "whosaurabh", url: "https://www.instagram.com/whosaurabh/" },
];