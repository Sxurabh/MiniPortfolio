"use client"

import React from "react"

interface IntroSectionProps {
  isDark: boolean
  toggleTheme: () => void
}

export const IntroSection = React.forwardRef<HTMLElement, IntroSectionProps>(({ isDark, toggleTheme }, ref) => {
  const handleDownloadCV = () => {
    const link = document.createElement("a")
    link.href = "/cv-saurabh-kirve.pdf"
    link.download = "Saurabh-Kirve-CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <header id="intro" ref={ref} className="min-h-screen flex items-center opacity-0">
      <div className="grid lg:grid-cols-5 gap-16 w-full">
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
            <div className="flex items-center justify-between lg:block">
              <h1 className="text-6xl lg:text-7xl font-light tracking-tight">
                Saurabh
                <br />
                <span className="text-muted-foreground">Kirve</span>
              </h1>
              <button
                onClick={toggleTheme}
                aria-pressed={isDark}
                aria-label={isDark ? "Turn lights on" : "Turn lights off"}
                className="lg:hidden px-3 py-1.5 text-xs rounded-md border border-border hover:border-muted-foreground/50 transition-colors"
              >
                {isDark ? "Lights out!" : "Lights on!"}
              </button>
            </div>
          </div>

          <div className="space-y-6 max-w-md">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Data Analyst crafting digital experiences at the intersection of
              <span className="text-foreground"> visualization</span>,
              <span className="text-foreground"> technology</span>, and
              <span className="text-foreground"> human behavior</span>.
            </p>

            <div className="pt-2">
              <button
                onClick={handleDownloadCV}
                className="group flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 text-foreground hover:text-foreground/90 text-xs"
              >
                <svg
                  className="w-4 h-4 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="border-0 text-foreground">My Life on Paper</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-end space-y-8">
          <div className="hidden lg:flex items-center justify-end">
            <button
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label={isDark ? "Turn lights on" : "Turn lights off"}
              className="px-3 py-1.5 text-xs rounded-md border border-border hover:border-muted-foreground/50 transition-colors"
            >
              {isDark ? "Lights out!" : "Lights on!"}
            </button>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
            <div className="space-y-2">
              <div className="text-foreground">Associate Analyst</div>
              <div className="text-muted-foreground">@ SG Analytics</div>
              <div className="text-xs text-muted-foreground">2023 — Present</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
            <div className="flex flex-wrap gap-2">
              {["Python", "SQL", "PowerBI", "MS-Excel", "Data Cleansing", "Data Visualization"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
});

IntroSection.displayName = "IntroSection";