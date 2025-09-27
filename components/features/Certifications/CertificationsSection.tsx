// sxurabh/miniportfolio/MiniPortfolio-aaa9e92389a1f99ac8e2f101069fb5f2a8e946a9/components/features/Certifications/CertificationsSection.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ExternalLink, Edit, Trash2, Loader2 } from "lucide-react";
import type { Certification } from "@/lib/types";
import { DeleteConfirmationModal } from "@/components/common/DeleteConfirmationModal";
import { deleteCertification } from "@/actions/certification";
import { fetchPaginatedCertifications } from "@/actions/fetchPaginatedData";
import { GenericCrudSection } from "../../sections/GenericCrudSection";
import { useCrudState } from "@/hooks/use-crud-state";
import { useIsAdmin } from "@/hooks/use-is-admin";

const CertificationFormModal = dynamic(() =>
  import("@/components/features/Certifications/CertificationFormModal").then((mod) => mod.CertificationFormModal),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    ),
  }
);

interface CertificationsSectionProps {
  initialCertifications: Certification[];
  totalItems: number;
}

export const CertificationsSection = React.forwardRef<HTMLElement, CertificationsSectionProps>(
  ({ initialCertifications, totalItems }, ref) => {
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
    } = useCrudState<Certification>();

    const itemsPerPage = 3;

    const renderItem = (cert: Certification) => {
      const now = new Date();
      const currentYear = now.getFullYear().toString();
      
      const isCurrentYear = cert.year.trim() === currentYear;

      const certDate = new Date(cert.createdAt);
      const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;
      const isRecentlyAdded = (now.getTime() - certDate.getTime()) < oneMonthInMs;

      const isNew = isCurrentYear && isRecentlyAdded;

      return (
        <div key={cert.id} className="group grid lg:grid-cols-12 gap-8 py-8 border-b border-border/50 hover:border-border transition-colors duration-500 relative">
          <div className="lg:col-span-2">
            <div className="text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
              {cert.year}
            </div>
          </div>
          <div className="lg:col-span-6 space-y-3">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-medium">{cert.title}</h3>
                {isNew && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-teal-400/50 text-teal-600 dark:border-teal-500/50 dark:text-teal-400">
                    New
                  </span>
                )}
              </div>
              <div className="text-muted-foreground mt-1">{cert.issuer}</div>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-lg">{cert.description}</p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-2 lg:items-end">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs border border-border rounded-lg text-muted-foreground group-hover:border-muted-foreground/50 transition-colors duration-300">
                {cert.credential}
              </span>
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="group/btn flex items-center gap-2 px-3 py-1 text-xs border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 text-muted-foreground hover:text-foreground" aria-label="View certification">
                <span>View</span>
                <ExternalLink className="w-3 h-3 transition-colors duration-300" />
              </a>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => handleEditItem(cert)} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Edit certification"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDeleteItem(cert)} className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Delete certification"><Trash2 className="w-4 h-4" /></button>
              </div>
            )}
          </div>
        </div>
      );
    };

    const renderModals = () => (
      <>
        {isFormModalOpen && (
          <CertificationFormModal 
            isOpen={isFormModalOpen} 
            onClose={closeFormModal} 
            certification={selectedItem} 
          />
        )}
        <DeleteConfirmationModal 
          isOpen={isDeleteModalOpen} 
          onClose={closeDeleteModal} 
          onConfirm={async () => {
            if (!selectedItem) return;
            return deleteCertification(selectedItem.id);
          }}
          itemName="certification"
        />
      </>
    );

    return (
      <GenericCrudSection
        id="certifications"
        ref={ref}
        title="Certifications"
        initialItems={initialCertifications}
        totalItems={totalItems}
        renderItem={renderItem}
        renderModals={renderModals}
        onAddItem={handleAddItem}
        itemsPerPage={itemsPerPage}
        fetchPaginatedData={fetchPaginatedCertifications}
      />
    );
  }
);

CertificationsSection.displayName = "CertificationsSection";