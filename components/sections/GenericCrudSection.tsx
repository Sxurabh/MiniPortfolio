"use client";

import React, { useState, ReactNode } from "react";
import { useSession } from "next-auth/react";

interface GenericCrudSectionProps<T extends { id: any }> {
  id: string;
  title: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  renderModals: () => ReactNode;
  onAddItem: () => void;
  itemsPerPage: number;
  gridClass?: string;
}

export const GenericCrudSection = React.forwardRef<
  HTMLElement,
  GenericCrudSectionProps<any>
>(({ id, title, items, renderItem, renderModals, onAddItem, itemsPerPage, gridClass = "space-y-12" }, ref) => {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const getPaginatedItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <>
      {isAdmin && renderModals()}
      <section id={id} ref={ref} className="min-h-screen py-32 opacity-0">
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
            {items.length > 0 && (
                <div className="text-sm text-muted-foreground font-mono">
                {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, items.length)} of {items.length}
              </div>
            )}
          </div>

          <div className={gridClass}>
            {items.length > 0 ? (
                getPaginatedItems().map((item) => renderItem(item))
            ) : (
                <div className="text-center text-muted-foreground py-16">
                    <p>There are no items to display yet.</p>
                    {isAdmin && <p className="text-sm mt-2">Click "Add New" to get started.</p>}
                </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg border transition-all duration-300 text-sm ${page === currentPage ? "border-foreground bg-foreground text-background" : "border-border hover:border-muted-foreground/50"}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
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