"use client";

import { useCallback, useRef, useEffect } from "react";
import { useModal } from "@/store/useModal";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { presentationService } from "@/lib/presentation";
import { createCustomEvent, PRESENTATION_UPDATED } from "@/utils/events";
import { AlertModal } from "@/components/ui/alert-modal";

export function RestorePresentationModal() {
    const { isModalOpen, modalData, modalName, onModalClose } = useModal();
    const { showSuccessToast, showErrorToast } = useCustomToast();
    const initializedRef = useRef(false);

    const isRestorePresentationModalOpen = isModalOpen && modalName === 'RestorePresentationModal';

    const initializeForm = useCallback(() => {
        if (isRestorePresentationModalOpen && !modalData?.presentation && !initializedRef.current) {
            showErrorToast({
                title: 'Not Found',
                description: 'Presentation not found.'
            });
            onModalClose();
        }
    }, [modalData, isRestorePresentationModalOpen, showErrorToast, onModalClose]);

    useEffect(() => {
        if (isRestorePresentationModalOpen) {
            initializeForm();
        } else {
            initializedRef.current = false;
        }
    }, [isRestorePresentationModalOpen, initializeForm]);

    const onConfirm = useCallback(async () => {
        try {
            const response = await presentationService.restore(modalData.presentation.id);
            if (response.success) {
                showSuccessToast({
                    title: 'Presentation restored',
                    description: 'Your presentation has been restored successfully.'
                });
                onModalClose();
                window.dispatchEvent(createCustomEvent(PRESENTATION_UPDATED, response.data));
            } else {
                showErrorToast({
                    title: 'Restore failed',
                    description: 'Failed to restore the presentation. Please try again.'
                });
            }
        } catch (error) {
            console.error('Restore presentation error:', error);
            showErrorToast({
                title: 'Error',
                description: 'An unexpected error occurred. Please try again.'
            });
        }
    }, [modalData, showSuccessToast, showErrorToast, onModalClose]);

    if (!isRestorePresentationModalOpen) {
        return null;
    }

    return (
        <AlertModal
            isOpen={isRestorePresentationModalOpen}
            onClose={onModalClose}
            onConfirm={onConfirm}
            title="Restore Confirmation"
            description="Are you sure you want to restore this presentation?"
            confirmClassName="bg-sky-500 hover:bg-sky-600"
        />
    );
}