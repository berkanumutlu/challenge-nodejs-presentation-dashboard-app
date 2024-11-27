"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPresentationFormSchema, CreatePresentationFormValues } from "@/types/presentation";
import { useModal } from "@/store/useModal";
import { presentationService } from "@/lib/presentation";
import { Modal } from "@/components/ui/modal";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";
import { FormFileUpload } from "@/components/ui/form-file-upload";
import { useCustomToast } from "@/components/ui/custom-toast";
;
export function CreatePresentationModal() {
    const { isModalOpen, modalName, onModalClose } = useModal();
    const { showSuccessToast, showErrorToast } = useCustomToast();

    const isCreatePresentationModalOpen = isModalOpen && modalName === 'CreatePresentationModal';
    const form = useForm<CreatePresentationFormValues>({
        resolver: zodResolver(createPresentationFormSchema),
        defaultValues: {
            name: '',
            thumbnailImage: null
        }
    })
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: CreatePresentationFormValues) => {
        try {
            const createRecord = await presentationService.create(values);
            if (createRecord?.success) {
                showSuccessToast({
                    title: 'Presentation created',
                    description: 'Your presentation has been created successfully.'
                })
                form.reset();
                onModalClose();
                window.dispatchEvent(new Event('presentationCreated'));
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
    }

    return (
        <Modal
            isOpen={isCreatePresentationModalOpen}
            onClose={onModalClose}
            onSubmit={form.handleSubmit(onSubmit)}
            isSubmitDisabled={!form.formState.isValid || isLoading}
            isLoading={isLoading}
            title="Create Presentation"
            buttonText="Create"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormInput
                        control={form.control}
                        isDisabled={isLoading}
                        name="name"
                        label="Presentation Name"
                        placeholder="Type your presentation name here."
                    />
                    <FormFileUpload
                        control={form.control}
                        isDisabled={isLoading}
                        name="thumbnailImage"
                        label="Presentation Thumbnail"
                    />
                </form>
            </Form>
        </Modal>
    )
}