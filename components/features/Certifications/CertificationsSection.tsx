// @/components/features/Certifications/CertificationsSection.tsx
"use client";

import React from "react";
import { ExternalLink, Edit, Trash2 } from "lucide-react";
import type { Certification } from "@/lib/types";
import { CertificationFormModal } from "@/components/features/Certifications/CertificationFormModal";
import { DeleteConfirmationModal } from "@/components/common/DeleteConfirmationModal";
import { deleteCertification } from "@/actions/certification";
import { GenericCrudSection } from "../../sections/GenericCrudSection";
import { useCrudState } from "@/hooks/use-crud-state";
import { useIsAdmin } from "@/hooks/use-is-admin";

interface CertificationsSectionProps {
  allCertifications: Certification[];
}

export const CertificationsSection = React.forwardRef<HTMLElement, CertificationsSectionProps>(
  ({ allCertifications }, ref) => {
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

    const renderItem = (cert: Certification) => (
      <div key={cert.id} className="group grid lg:grid-cols-12 gap-8 py-8 border-b border-border/50 hover:border-border transition-colors duration-500 relative">
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

    const renderModals = () => (
      <>
        <CertificationFormModal 
          isOpen={isFormModalOpen} 
          onClose={closeFormModal} 
          certification={selectedItem} 
        />
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
        items={allCertifications}
        renderItem={renderItem}
        renderModals={renderModals}
        onAddItem={handleAddItem}
        itemsPerPage={3}
      />
    );
  }
);

CertificationsSection.displayName = "CertificationsSection";