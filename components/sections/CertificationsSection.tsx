"use client"
import React, { useState } from "react"
import { ExternalLink } from "lucide-react"
import type { Certification } from "@/lib/types";

const CERTIFICATIONS_PER_PAGE = 3

interface CertificationsSectionProps {
    allCertifications: Certification[];
}

export const CertificationsSection = React.forwardRef<HTMLElement, CertificationsSectionProps>(({ allCertifications }, ref) => {
  const [certificationsPage, setCertificationsPage] = useState(1)

  const getPaginatedCertifications = () => {
    const startIndex = (certificationsPage - 1) * CERTIFICATIONS_PER_PAGE
    return allCertifications.slice(startIndex, startIndex + CERTIFICATIONS_PER_PAGE)
  }

  const totalPages = Math.ceil(allCertifications.length / CERTIFICATIONS_PER_PAGE)

  return (
    <section id="certifications" ref={ref} className="min-h-screen py-32 opacity-0">
      <div className="space-y-16">
        <div className="flex items-end justify-between">
          <h2 className="text-4xl font-light">Certifications</h2>
          <div className="text-sm text-muted-foreground font-mono">
            {(certificationsPage - 1) * CERTIFICATIONS_PER_PAGE + 1}-
            {Math.min(certificationsPage * CERTIFICATIONS_PER_PAGE, allCertifications.length)} of{" "}
            {allCertifications.length}
          </div>
        </div>

        <div className="space-y-12">
          {getPaginatedCertifications().map((cert, index) => (
            <div
              key={index}
              className="group grid lg:grid-cols-12 gap-8 py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
            >
              <div className="lg:col-span-2">
                <div className="text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                  {cert.year}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <div>
                  <h3 className="text-xl font-medium">{cert.title}</h3>
                  <div className="text-muted-foreground">{cert.issuer}</div>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg">{cert.description}</p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-2 lg:items-end">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-xs border border-border rounded-lg text-muted-foreground group-hover:border-muted-foreground/50 transition-colors duration-300">
                    {cert.credential}
                  </span>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center gap-2 px-3 py-1 text-xs border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 text-muted-foreground hover:text-foreground"
                    aria-label="View certification"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3 transition-colors duration-300" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCertificationsPage(Math.max(1, certificationsPage - 1))}
              disabled={certificationsPage === 1}
              className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCertificationsPage(page)}
                  className={`w-8 h-8 rounded-lg border transition-all duration-300 text-sm ${
                    page === certificationsPage
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCertificationsPage(Math.min(totalPages, certificationsPage + 1))}
              disabled={certificationsPage === totalPages}
              className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
});

CertificationsSection.displayName = "CertificationsSection";