"use client";

import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPresentationFormSchema, CreatePresentationFormValues } from "@/types/presentation";
import { useModal } from "@/store/useModal";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { presentationService } from "@/lib/presentation";
import { createCustomEvent, PRESENTATION_CREATED } from "@/utils/events";
import { Modal } from "@/components/ui/modal";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";
import { FormFileUpload } from "@/components/ui/form-file-upload";
;
export function CreatePresentationModal() {
    const { isModalOpen, modalName, onModalClose } = useModal();
    const { showSuccessToast, showErrorToast } = useCustomToast();

    const isCreatePresentationModalOpen = isModalOpen && modalName === 'CreatePresentationModal';
    const modalForm = useForm<CreatePresentationFormValues>({
        resolver: zodResolver(createPresentationFormSchema),
        defaultValues: {
            name: '',
            thumbnailImage: null
        }
    });
    const isModalLoading = modalForm.formState.isSubmitting;

    useEffect(() => {
        modalForm.reset();
        return () => { }
    }, [modalForm]);

    const onSubmit = useCallback(async (values: CreatePresentationFormValues) => {
        try {
            const response = await presentationService.create(values);
            if (response?.success) {
                showSuccessToast({
                    title: 'Presentation created',
                    description: 'Your presentation has been created successfully.'
                });
                modalForm.reset();
                onModalClose();
                window.dispatchEvent(createCustomEvent(PRESENTATION_CREATED, response.data));
            } else {
                showErrorToast({
                    title: 'Creation failed',
                    description: 'Failed to create the presentation. Please try again.'
                });
            }
        } catch (error) {
            console.error('Create presentation modal onSubmit error:', error);
            showErrorToast({
                title: 'Error',
                description: 'An unexpected error occurred. Please try again.'
            });
        }
    }, [modalForm, onModalClose, showErrorToast, showSuccessToast]);

    if (!isCreatePresentationModalOpen) {
        return null;
    }

    return (
        <Modal
            isOpen={isCreatePresentationModalOpen}
            onClose={onModalClose}
            onSubmit={modalForm.handleSubmit(onSubmit)}
            isSubmitDisabled={!modalForm.formState.isValid || isModalLoading}
            isLoading={isModalLoading}
            title="Create Presentation"
            buttonText="Create"
        >
            <Form {...modalForm}>
                <form onSubmit={modalForm.handleSubmit(onSubmit)} className="space-y-8">
                    <FormInput
                        control={modalForm.control}
                        name="name"
                        label="Presentation Name"
                        placeholder="Type your presentation name here."
                    />
                    <FormFileUpload
                        control={modalForm.control}
                        name="thumbnailImage"
                        label="Presentation Thumbnail"
                    />
                </form>
            </Form>
        </Modal>
    )
}