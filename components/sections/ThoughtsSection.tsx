"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ExternalLink, Edit, Trash2 } from "lucide-react";
import type { Thought } from "@/lib/types";
import { ThoughtFormModal } from "@/components/modals/ThoughtFormModal"; // Import the new modal
import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";
import { deleteThought } from "@/actions/thought";
import { GenericCrudSection } from "./GenericCrudSection";

interface ThoughtsSectionProps {
  allThoughts: Thought[];
}

export const ThoughtsSection = React.forwardRef<HTMLElement, ThoughtsSectionProps>(
  ({ allThoughts }, ref) => {
    const { data: session } = useSession();
    const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedThought, setSelectedThought] = useState<Thought | null>(null);

    const handleAddClick = () => {
      setSelectedThought(null);
      setIsFormModalOpen(true);
    };

    const handleEditClick = (thought: Thought) => {
      setSelectedThought(thought);
      setIsFormModalOpen(true);
    };

    const handleDeleteClick = (thought: Thought) => {
      setSelectedThought(thought);
      setIsDeleteModalOpen(true);
    };

    const renderItem = (post: Thought) => (
      <article key={post.id} className="group p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          <h3 className="text-xl font-medium mt-4">{post.title}</h3>
          <p className="text-muted-foreground leading-relaxed mt-2">{post.excerpt}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <Link href={post.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
            <span>Read more</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
          {isAdmin && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button onClick={() => handleEditClick(post)} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Edit thought"><Edit className="w-4 h-4" /></button>
              <button onClick={() => handleDeleteClick(post)} className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Delete thought"><Trash2 className="w-4 h-4" /></button>
            </div>
          )}
        </div>
      </article>
    );

    const renderModals = () => (
      <>
        <ThoughtFormModal 
          isOpen={isFormModalOpen} 
          onClose={() => setIsFormModalOpen(false)} 
          thought={selectedThought} 
        />
        <DeleteConfirmationModal 
          isOpen={isDeleteModalOpen} 
          onClose={() => setIsDeleteModalOpen(false)} 
          onConfirm={async () => {
            if (!selectedThought) return;
            return deleteThought(selectedThought.id);
          }}
          itemName="thought"
        />
      </>
    );
    
    return (
      <GenericCrudSection
        id="thoughts"
        ref={ref}
        title="Recent Thoughts"
        items={allThoughts}
        renderItem={renderItem}
        renderModals={renderModals}
        onAddItem={handleAddClick}
        itemsPerPage={4}
        gridClass="grid lg:grid-cols-2 gap-8"
      />
    );
  }
);

ThoughtsSection.displayName = "ThoughtsSection";