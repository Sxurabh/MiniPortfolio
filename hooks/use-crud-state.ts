// @/hooks/use-crud-state.ts
"use client";

import { useState } from "react";

export function useCrudState<T>() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleAddItem = () => {
    setSelectedItem(null);
    setIsFormModalOpen(true);
  };

  const handleEditItem = (item: T) => {
    setSelectedItem(item);
    setIsFormModalOpen(true);
  };

  const handleDeleteItem = (item: T) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const closeFormModal = () => setIsFormModalOpen(false);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return {
    isFormModalOpen,
    isDeleteModalOpen,
    selectedItem,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
    closeFormModal,
    closeDeleteModal,
  };
}