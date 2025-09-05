"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ExternalLink, Edit, Trash2 } from "lucide-react";
import type { Thought } from "@/lib/types";
import { AddThoughtModal } from "@/components/modals/AddThoughtModal";
import { EditThoughtModal } from "@/components/modals/EditThoughtModal";
import { DeleteThoughtModal } from "@/components/modals/DeleteThoughtModal";

const THOUGHTS_PER_PAGE = 4;

interface ThoughtsSectionProps {
  allThoughts: Thought[];
}

export const ThoughtsSection = React.forwardRef<
  HTMLElement,
  ThoughtsSectionProps
>(({ allThoughts }, ref) => {
  const { data: session } = useSession();
  const [thoughtsPage, setThoughtsPage] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedThought, setSelectedThought] = useState<Thought | null>(null);

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const handleEditClick = (thought: Thought) => {
    setSelectedThought(thought);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (thought: Thought) => {
    setSelectedThought(thought);
    setIsDeleteModalOpen(true);
  };

  const getPaginatedThoughts = () => {
    const startIndex = (thoughtsPage - 1) * THOUGHTS_PER_PAGE;
    return allThoughts.slice(startIndex, startIndex + THOUGHTS_PER_PAGE);
  };

  const totalPages = Math.ceil(allThoughts.length / THOUGHTS_PER_PAGE);

  return (
    <>
      <AddThoughtModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditThoughtModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} thought={selectedThought} />
      <DeleteThoughtModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} thoughtId={selectedThought?.id ?? null} />

      <section id="thoughts" ref={ref} className="min-h-screen py-32 opacity-0">
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-light">Recent Thoughts</h2>
              {isAdmin && (
                <button onClick={() => setIsAddModalOpen(true)} className="px-3 py-1.5 text-xs rounded-md border border-border hover:border-muted-foreground/50 transition-colors">
                  Add New Thought
                </button>
              )}
            </div>
            <div className="text-sm text-muted-foreground font-mono">
              {(thoughtsPage - 1) * THOUGHTS_PER_PAGE + 1}-
              {Math.min(thoughtsPage * THOUGHTS_PER_PAGE, allThoughts.length)} of {allThoughts.length}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {getPaginatedThoughts().map((post) => (
              <article key={post.id} className="group p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-medium mt-4">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mt-2">{post.excerpt}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Link href={post.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                    <span>Read more</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                   {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleEditClick(post)} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Edit thought"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteClick(post)} className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Delete thought"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-8">
              <button
                onClick={() => setThoughtsPage(Math.max(1, thoughtsPage - 1))}
                disabled={thoughtsPage === 1}
                className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setThoughtsPage(page)}
                    className={`w-8 h-8 rounded-lg border transition-all duration-300 text-sm ${page === thoughtsPage ? "border-foreground bg-foreground text-background" : "border-border hover:border-muted-foreground/50"}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setThoughtsPage(Math.min(totalPages, thoughtsPage + 1))}
                disabled={thoughtsPage === totalPages}
                className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
});

ThoughtsSection.displayName = "ThoughtsSection";