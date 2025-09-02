"use client"
import React, { useState } from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import type { Thought } from "@/lib/types"

const THOUGHTS_PER_PAGE = 4

interface ThoughtsSectionProps {
    allThoughts: Thought[];
}

export const ThoughtsSection = React.forwardRef<HTMLElement, ThoughtsSectionProps>(({ allThoughts }, ref) => {
  const [thoughtsPage, setThoughtsPage] = useState(1)

  const getPaginatedThoughts = () => {
    const startIndex = (thoughtsPage - 1) * THOUGHTS_PER_PAGE
    return allThoughts.slice(startIndex, startIndex + THOUGHTS_PER_PAGE)
  }

  const totalPages = Math.ceil(allThoughts.length / THOUGHTS_PER_PAGE)

  return (
    <section id="thoughts" ref={ref} className="min-h-screen py-32 opacity-0">
      <div className="space-y-16">
        <div className="flex items-end justify-between">
          <h2 className="text-4xl font-light">Recent Thoughts</h2>
          <div className="text-sm text-muted-foreground font-mono">
            {(thoughtsPage - 1) * THOUGHTS_PER_PAGE + 1}-
            {Math.min(thoughtsPage * THOUGHTS_PER_PAGE, allThoughts.length)} of {allThoughts.length}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {getPaginatedThoughts().map((post, index) => (
            <Link
              key={index}
              href={post.url}
              passHref
              className="group p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg flex"
              target="_blank"
              rel="noopener noreferrer"
            >
              <article className="flex flex-col justify-between w-full">
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300 mt-4">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mt-2">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 mt-4">
                  <span>Read more</span>
                  <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </article>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setThoughtsPage(Math.max(1, thoughtsPage - 1))}
              disabled={thoughtsPage === 1}
              className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setThoughtsPage(page)}
                    className={`w-8 h-8 rounded-lg border transition-all duration-300 text-sm ${
                      page === thoughtsPage
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-muted-foreground/50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() =>
                setThoughtsPage(Math.min(totalPages, thoughtsPage + 1))
              }
              disabled={thoughtsPage === totalPages}
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

ThoughtsSection.displayName = "ThoughtsSection";