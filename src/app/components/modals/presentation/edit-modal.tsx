"use client";

import { useCallback, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { editPresentationFormSchema, EditPresentationFormValues } from "@/types/presentation";
import { useModal } from "@/store/useModal";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { getPresentationImageUrl, presentationService } from "@/lib/presentation";
import { Modal } from "@/components/ui/modal";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";
import { FormFileUpload } from "@/components/ui/form-file-upload";

export function EditPresentationModal() {
    const { isModalOpen, modalData, modalName, onModalClose } = useModal();
    const { showSuccessToast, showErrorToast } = useCustomToast();
    const initializedRef = useRef(false);

    const isEditPresentationModalOpen = isModalOpen && modalName === 'EditPresentationModal';
    const modalForm = useForm<EditPresentationFormValues>({
        resolver: zodResolver(editPresentationFormSchema),
        defaultValues: {
            name: '',
            thumbnailImage: null
        }
    });
    const isModalLoading = modalForm.formState.isSubmitting;

    const initializeForm = useCallback(() => {
        if (modalData?.presentation && !initializedRef.current) {
            modalForm.reset({
                name: modalData.presentation.name,
                thumbnailImage: null
            });
            initializedRef.current = true;
        } else if (isEditPresentationModalOpen && !modalData?.presentation && !initializedRef.current) {
            showErrorToast({
                title: 'Not Found',
                description: 'Presentation not found.'
            });
            onModalClose();
        }
    }, [modalData, modalForm, isEditPresentationModalOpen, showErrorToast, onModalClose]);

    useEffect(() => {
        if (isEditPresentationModalOpen) {
            initializeForm();
        } else {
            initializedRef.current = false;
        }
    }, [isEditPresentationModalOpen, initializeForm]);

    const onSubmit = useCallback(async (values: EditPresentationFormValues) => {
        try {
            const updateRecord = await presentationService.update(modalData?.presentation?.id, values);
            if (updateRecord?.success) {
                showSuccessToast({
                    title: 'Presentation updated',
                    description: 'Your presentation has been updated successfully.'
                });
                onModalClose();
                window.dispatchEvent(new Event('refreshPresentationList'));
            } else {
                showErrorToast({
                    title: 'Update failed',
                    description: 'Failed to update the presentation. Please try again.'
                });
            }
        } catch (error) {
            console.error('Update presentation modal onSubmit error:', error);
            showErrorToast({
                title: 'Error',
                description: 'An unexpected error occurred. Please try again.'
            });
        }
    }, [modalData, showSuccessToast, showErrorToast, onModalClose]);

    if (!isEditPresentationModalOpen) {
        return null;
    }

    return (
        <Modal
            isOpen={isEditPresentationModalOpen}
            onClose={onModalClose}
            onSubmit={modalForm.handleSubmit(onSubmit)}
            isSubmitDisabled={!modalForm.formState.isValid || isModalLoading}
            isLoading={isModalLoading}
            title="Edit Presentation"
            buttonText="Save"
        >
            <Form {...modalForm}>
                <form onSubmit={modalForm.handleSubmit(onSubmit)} className="space-y-8">
                    <FormInput
                        control={modalForm.control}
                        name="name"
                        label="Presentation Name"
                        placeholder="Enter new presentation name"
                    />
                    <FormFileUpload
                        control={modalForm.control}
                        name="thumbnailImage"
                        label="Presentation Thumbnail"
                    />
                    {modalData?.presentation?.thumbnailImage && (
                        <div className="mt-4">
                            <p className="text-sm font-medium mb-2">Current:</p>
                            <a href={getPresentationImageUrl(modalData.presentation.thumbnailImage)} target="_blank" rel="noopener noreferrer" className="inline-block">
                                <Image
                                    src={getPresentationImageUrl(modalData.presentation.thumbnailImage)}
                                    alt={modalData.presentation.name || 'Current Thumbnail Image'}
                                    width={100}
                                    height={100}
                                    className="rounded-md cursor-pointer"
                                />
                            </a>
                        </div>
                    )}
                </form>
            </Form>
        </Modal>
    );
}