"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { ExternalLink, Edit, Trash2 } from "lucide-react";
import type { Certification } from "@/lib/types";
import { AddCertificationModal } from "@/components/modals/AddCertificationModal";
import { EditCertificationModal } from "@/components/modals/EditCertificationModal";
import { DeleteCertificationModal } from "@/components/modals/DeleteCertificationModal";

const CERTIFICATIONS_PER_PAGE = 3;

interface CertificationsSectionProps {
  allCertifications: Certification[];
}

export const CertificationsSection = React.forwardRef<
  HTMLElement,
  CertificationsSectionProps
>(({ allCertifications }, ref) => {
  const { data: session } = useSession();
  const [certificationsPage, setCertificationsPage] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const handleEditClick = (cert: Certification) => {
    setSelectedCertification(cert);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (cert: Certification) => {
    setSelectedCertification(cert);
    setIsDeleteModalOpen(true);
  };

  const getPaginatedCertifications = () => {
    const startIndex = (certificationsPage - 1) * CERTIFICATIONS_PER_PAGE;
    return allCertifications.slice(startIndex, startIndex + CERTIFICATIONS_PER_PAGE);
  };

  const totalPages = Math.ceil(allCertifications.length / CERTIFICATIONS_PER_PAGE);

  return (
    <>
      <AddCertificationModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditCertificationModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} certification={selectedCertification} />
      <DeleteCertificationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} certificationId={selectedCertification?.id ?? null} />

      <section id="certifications" ref={ref} className="min-h-screen py-32 opacity-0">
        <div className="space-y-16">
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-light">Certifications</h2>
              {isAdmin && (
                <button onClick={() => setIsAddModalOpen(true)} className="px-3 py-1.5 text-xs rounded-md border border-border hover:border-muted-foreground/50 transition-colors">
                  Add New Certification
                </button>
              )}
            </div>
            <div className="text-sm text-muted-foreground font-mono">
              {(certificationsPage - 1) * CERTIFICATIONS_PER_PAGE + 1}-
              {Math.min(certificationsPage * CERTIFICATIONS_PER_PAGE, allCertifications.length)} of{" "}
              {allCertifications.length}
            </div>
          </div>

          <div className="space-y-12">
            {getPaginatedCertifications().map((cert) => (
              <div key={cert.id} className="group grid lg:grid-cols-12 gap-8 py-8 border-b border-border/50 hover:border-border transition-colors duration-500">
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

                {/* MODIFIED SECTION: Pills and Admin buttons are now stacked vertically */}
                <div className="lg:col-span-4 flex flex-col gap-2 lg:items-end">
                  {/* Credential and View Pills */}
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-xs border border-border rounded-lg text-muted-foreground group-hover:border-muted-foreground/50 transition-colors duration-300">
                      {cert.credential}
                    </span>
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="group/btn flex items-center gap-2 px-3 py-1 text-xs border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 text-muted-foreground hover:text-foreground" aria-label="View certification">
                      <span>View</span>
                      <ExternalLink className="w-3 h-3 transition-colors duration-300" />
                    </a>
                  </div>

                  {/* Admin Buttons - Appear on hover */}
                  {isAdmin && (
                    <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button onClick={() => handleEditClick(cert)} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Edit certification"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteClick(cert)} className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Delete certification"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              {/* Pagination buttons here... */}
            </div>
          )}
        </div>
      </section>
    </>
  );
});

CertificationsSection.displayName = "CertificationsSection";
