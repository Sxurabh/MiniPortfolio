// sxurabh/miniportfolio/MiniPortfolio-ExperimentalBranch/components/features/Thoughts/ThoughtsSection.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ExternalLink, Edit, Trash2, Loader2 } from "lucide-react";
import type { Thought } from "@/lib/types";
import { DeleteConfirmationModal } from "@/components/common/DeleteConfirmationModal";
import { deleteThought } from "@/actions/thought";
import { fetchPaginatedThoughts } from "@/actions/fetchPaginatedData"; // <-- IMPORT
import { GenericCrudSection } from "@/components/sections/GenericCrudSection";
import { useCrudState } from "@/hooks/use-crud-state";
import { useIsAdmin } from "@/hooks/use-is-admin";

const ThoughtFormModal = dynamic(() =>
  import("./ThoughtFormModal").then((mod) => mod.ThoughtFormModal),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    ),
  }
);

interface ThoughtsSectionProps {
  allThoughts: Thought[];
  totalItems: number;
}

export const ThoughtsSection = React.forwardRef<HTMLElement, ThoughtsSectionProps>(
  ({ allThoughts, totalItems }, ref) => {
    const isAdmin = useIsAdmin();
    const {
      isFormModalOpen,
      isDeleteModalOpen,
      selectedItem,
      handleAddItem,
      handleEditItem,
      handleDeleteItem,
      closeFormModal,
      closeDeleteModal,
    } = useCrudState<Thought>();

    const itemsPerPage = 4; // Define items per page

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
              <button onClick={() => handleEditItem(post)} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Edit thought"><Edit className="w-4 h-4" /></button>
              <button onClick={() => handleDeleteItem(post)} className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Delete thought"><Trash2 className="w-4 h-4" /></button>
            </div>
          )}
        </div>
      </article>
    );

    const renderModals = () => (
      <>
        {isFormModalOpen && (
          <ThoughtFormModal 
            isOpen={isFormModalOpen} 
            onClose={closeFormModal} 
            thought={selectedItem} 
          />
        )}
        <DeleteConfirmationModal 
          isOpen={isDeleteModalOpen} 
          onClose={closeDeleteModal} 
          onConfirm={async () => {
            if (!selectedItem) return;
            return deleteThought(selectedItem.id);
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
        totalItems={totalItems}
        renderItem={renderItem}
        renderModals={renderModals}
        onAddItem={handleAddItem}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => fetchPaginatedThoughts(page, itemsPerPage)} // <-- PASS THE ACTION
        gridClass="grid lg:grid-cols-2 gap-8"
      />
    );
  }
);

ThoughtsSection.displayName = "ThoughtsSection";