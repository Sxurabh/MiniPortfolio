import type React from "react"
import type { Metadata } from "next"
import { Inter, Kalam } from "next/font/google"
import AuthProvider from "@/components/AuthProvider"
import { Toaster } from "sonner"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-kalam",
})

export const metadata: Metadata = {
  title: "Saurabh Kirve - Data Sculptor",
  description: "Exploring the intersection of Data modeling, stories, and AI.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${kalam.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
            {children}
            <Toaster closeButton />
            <Analytics />
            <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  )
}