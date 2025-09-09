# 🚀 MiniPortfolio v2.0 - A Dynamic & Interactive Personal Portfolio

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A sleek, modern, and fully-featured personal portfolio website built with Next.js, Prisma, and Tailwind CSS. This isn't just a static site; it's a full-stack application with a powerful admin backend, user authentication, and interactive elements designed to create a lasting impression.

**Live Demo:** [saurabh-data-analyst.vercel.app](https://saurabh-data-analyst.vercel.app/)

---

## ✨ Core Features

This portfolio is packed with features that make it more than just a simple showcase:

-   **🎨 Elegant & Minimalist UI**: Styled with Tailwind CSS and shadcn/ui for a clean, professional, and fully responsive experience.
-   **🌓 Light/Dark Mode**: A theme toggle that respects user preferences and provides a great viewing experience in any lighting.
-   **🔐 Admin Dashboard (CRUD Functionality)**:
    -   **Authentication**: Secure admin login using NextAuth.js (GitHub & Google providers).
    -   **Content Management**: Admins can **Create, Read, Update, and Delete** portfolio items directly from the UI for:
        -   Work Experience
        -   Projects
        -   Certifications
        -   Thoughts/Blog Posts
-   **📄 Dynamic CV Management**: Admins can upload and delete a PDF CV, which is stored using **Vercel Blob Storage**. The "Download CV" button only appears if a CV exists.
-   **💬 Visitor Messaging System**:
    -   Authenticated visitors can leave short messages for the portfolio owner.
    -   Admins have a private "Inbox" modal to view all visitor messages securely.
-   **⚡️ Performance Optimized**: Built with Next.js for fast page loads, leveraging Server-Side Rendering (SSR) and dynamic imports to keep things snappy.
-   **
-   **Animate on Scroll**: Subtle animations on scroll for a more engaging user experience.

---

## 🛠 Tech Stack & Tools

This project brings together a modern, full-stack tech ecosystem:

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
-   **Database ORM**: [Prisma](https://www.prisma.io/)
-   **Database**: PostgreSQL (e.g., [Neon](https://neon.tech/), [Vercel Postgres](https://vercel.com/storage/postgres))
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
-   **File Storage**: [Vercel Blob](https://vercel.com/storage/blob)
-   **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
-   **UI/UX**: [Lucide React](https://lucide.dev/) for icons, [Sonner](https://sonner.emilkowal.ski/) for toast notifications.
-   **Deployment**: [Vercel](https://vercel.com/)

---

## 📂 Project Structure

The project is organized with a clear separation of concerns, making it easy to navigate and maintain.
/
├── app/                  # Next.js App Router: pages, layouts, API routes
│   ├── api/              # API routes (e.g., NextAuth.js)
│   ├── admin/            # Admin-only pages (e.g., message board)
│   └── page.tsx          # Main portfolio page
├── actions/              # Server Actions for all CRUD operations
├── components/           # Reusable components
│   ├── common/           # Generic components (Modals, Buttons)
│   ├── features/         # Components for specific portfolio sections
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Helper functions, schemas, auth config, Prisma client
├── prisma/               # Database schema, migrations, and seed scripts
├── public/               # Static assets (images, favicon)
└── ...
