"use client";

import { useCallback, useRef, useEffect } from "react";
import { useModal } from "@/store/useModal";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { presentationService } from "@/lib/presentation";
import { createCustomEvent, PRESENTATION_UPDATED } from "@/utils/events";
import { AlertModal } from "@/components/ui/alert-modal";

export function DeletePresentationModal() {
    const { isModalOpen, modalData, modalName, onModalClose } = useModal();
    const { showSuccessToast, showErrorToast } = useCustomToast();
    const initializedRef = useRef(false);

    const isDeletePresentationModalOpen = isModalOpen && modalName === 'DeletePresentationModal';

    const initializeForm = useCallback(() => {
        if (isDeletePresentationModalOpen && !modalData?.presentation && !initializedRef.current) {
            showErrorToast({
                title: 'Not Found',
                description: 'Presentation not found.'
            });
            onModalClose();
        }
    }, [modalData, isDeletePresentationModalOpen, showErrorToast, onModalClose]);

    useEffect(() => {
        if (isDeletePresentationModalOpen) {
            initializeForm();
        } else {
            initializedRef.current = false;
        }
    }, [isDeletePresentationModalOpen, initializeForm]);

    const onConfirm = useCallback(async () => {
        try {
            const response = await presentationService.delete(modalData.presentation.id);
            if (response?.success) {
                showSuccessToast({
                    title: 'Presentation deleted',
                    description: 'Your presentation has been deleted successfully.'
                });
                onModalClose();
                window.dispatchEvent(createCustomEvent(PRESENTATION_UPDATED, response.data));
            } else {
                showErrorToast({
                    title: 'Delete failed',
                    description: 'Failed to delete the presentation. Please try again.'
                });
            }
        } catch (error) {
            console.error('Delete presentation error:', error);
            showErrorToast({
                title: 'Error',
                description: 'An unexpected error occurred. Please try again.'
            });
        }
    }, [modalData, showSuccessToast, showErrorToast, onModalClose]);

    if (!isDeletePresentationModalOpen) {
        return null;
    }

    return (
        <AlertModal
            isOpen={isDeletePresentationModalOpen}
            onClose={onModalClose}
            onConfirm={onConfirm}
            title="Delete Confirmation"
            description="Are you sure you want to delete this presentation? This action can be undone later."
            confirmClassName="bg-red-500 hover:bg-red-600"
        />
    );
}