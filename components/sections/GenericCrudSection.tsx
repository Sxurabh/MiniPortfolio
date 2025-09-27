// sxurabh/miniportfolio/MiniPortfolio-aaa9e92389a1f99ac8e2f101069fb5f2a8e946a9/components/sections/GenericCrudSection.tsx
"use client";

import React, { useState, useTransition, ReactNode } from "react";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { Loader2 } from "lucide-react";

interface GenericCrudSectionProps<T extends { id: any }> {
  id: string;
  title: string;
  initialItems: T[];
  totalItems: number;
  renderItem: (item: T) => ReactNode;
  renderModals: () => ReactNode;
  onAddItem: () => void;
  fetchPaginatedData: (page: number, limit: number) => Promise<T[]>;
  itemsPerPage: number;
  gridClass?: string;
}

export const GenericCrudSection = React.forwardRef<
  HTMLElement,
  GenericCrudSectionProps<any>
>(({ id, title, initialItems, totalItems, renderItem, renderModals, onAddItem, fetchPaginatedData, itemsPerPage, gridClass = "" }, ref) => {
  const isAdmin = useIsAdmin();
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState<any[]>(initialItems);
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage || isPending || newPage < 1 || newPage > totalPages) return;

    startTransition(async () => {
      const newItems = await fetchPaginatedData(newPage, itemsPerPage);
      setDisplayedItems(newItems);
      setCurrentPage(newPage);
    });
  };

  return (
    <>
      {isAdmin && renderModals()}
      <section id={id} ref={ref} className="py-32 opacity-0">
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-light">{title}</h2>
              {isAdmin && (
                <button onClick={onAddItem} className="px-3 py-1.5 text-xs rounded-md border border-border hover:border-muted-foreground/50 transition-colors">
                  Add New
                </button>
              )}
            </div>
            {totalItems > 0 && (
              <div className="text-sm text-muted-foreground font-mono">
                {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
              </div>
            )}
          </div>

          <div className="relative min-h-[200px]">
            {isPending && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg">
                <Loader2 className="w-8 h-8 animate-spin text-foreground" />
              </div>
            )}
            <div className={`${gridClass} ${isPending ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
              {displayedItems.length > 0 ? (
                displayedItems.map((item) => renderItem(item))
              ) : (
                <div className="text-center text-muted-foreground py-16 col-span-full">
                  <p>There are no items to display yet.</p>
                  {isAdmin && <p className="text-sm mt-2">Click "Add New" to get started.</p>}
                </div>
              )}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isPending}
                className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={isPending}
                    className={`w-8 h-8 rounded-lg border transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed ${page === currentPage ? "border-foreground bg-foreground text-background" : "border-border hover:border-muted-foreground/50"}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isPending}
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

GenericCrudSection.displayName = "GenericCrudSection";