"use client";

import React, { useState } from "react";
import PresentationItem from "@/components/presentation/presentation-item";
import { RenamePresentationModal } from "@/components/modals/presentation/rename-modal";
import { AlertModal } from "@/components/ui/alert-modal";
import { createPresentationItemsSkeleton } from "@/components/ui/skeletons/presentation";

interface PresentationListProps {
    presentations: any;
    onRename: (id: string, newName: string) => void;
    onDelete: (id: string) => void;
}

export default function PresentationList({
    presentations,
    onRename,
    onDelete
}: PresentationListProps) {
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [currentPresentationId, setCurrentPresentationId] = useState<string | null>(null);
    const [presentationToDelete, setPresentationToDelete] = useState<string | null>(null);

    const openRenameModal = (id: string) => {
        setCurrentPresentationId(id);
        setIsRenameModalOpen(true);
    };
    const closeRenameModal = () => {
        setIsRenameModalOpen(false);
        setCurrentPresentationId(null);
    };

    const openAlertModal = (id: string) => {
        setPresentationToDelete(id);
        setIsAlertModalOpen(true);
    };
    const closeAlertModal = () => {
        setIsAlertModalOpen(false);
        setPresentationToDelete(null);
    };

    const confirmDelete = () => {
        if (presentationToDelete) {
            onDelete(presentationToDelete);
        }
        closeAlertModal();
    };

    const currentPresentation = presentations?.data?.items?.find(
        (item: any) => item.id === currentPresentationId
    );

    return (
        <>
            <div className="space-y-1 mb-5">
                <h3 className="text-sm font-medium text-tertiary">Decks</h3>
                <h4 className="text-xs font-medium text-[#9AA0AB]">
                    {presentations?.data?.meta?.total || 0}{" "}{presentations?.data?.meta?.total > 1 ? "files" : "file"}
                </h4>
            </div>
            <div className="flex flex-wrap gap-5 xl:gap-x-3">
                {presentations ? (
                    presentations.data.items.map((presentation: any) => (
                        <PresentationItem
                            key={presentation.id}
                            data={presentation}
                            onRenameClick={() => openRenameModal(presentation.id)}
                            onDeleteClick={() => openAlertModal(presentation.id)}
                        />
                    ))
                ) : (
                    createPresentationItemsSkeleton(24)
                )}
            </div>
            {currentPresentation && (
                <>
                    <RenamePresentationModal
                        isOpen={isRenameModalOpen}
                        onClose={closeRenameModal}
                        onRename={(newName) => {
                            onRename(currentPresentation.id, newName);
                            closeRenameModal();
                        }}
                        currentName={currentPresentation.name}
                    />
                </>
            )}
            <AlertModal
                isOpen={isAlertModalOpen}
                onClose={closeAlertModal}
                onConfirm={confirmDelete}
                title="Delete Confirmation"
                description="Are you sure you want to delete this presentation? This action cannot be undone."
                confirmClassName="bg-red-500 hover:bg-red-600"
            />
        </>
    );
}
