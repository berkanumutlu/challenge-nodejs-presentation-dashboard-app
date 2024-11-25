"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { FormInput } from "@/components/ui/form-input";
import { FileUpload } from "@/components/ui/file-upload";

interface CreatePresentationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string, image: File | null) => void;
}

export function CreatePresentationModal({ isOpen, onClose, onCreate }: CreatePresentationModalProps) {
    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = () => {
        if (name.trim() === "" || !image) {
            setIsError(true);
            return;
        }
        setIsLoading(true);
        onCreate(name.trim(), image);
        setTimeout(() => {
            setName("");
            setImage(null);
            setIsError(false);
            setIsLoading(false);
            onClose();
        }, 3000); // Simulating API call
    };

    const isFormValid = name.trim() !== "" && image !== null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Presentation"
            onSubmit={handleCreate}
            submitText="Create"
            isLoading={isLoading}
            isSubmitDisabled={!isFormValid}
        >
            <FormInput
                id="name"
                label="Presentation Name"
                value={name}
                isDisabled={isLoading}
                onChange={setName}
                placeholder="Type your presentation name here."
                error={isError && name.trim() === "" ? "Please enter a valid name." : ""}
            />
            <FileUpload
                id="image"
                label="Presentation Thumbnail"
                isDisabled={isLoading}
                onChange={setImage}
                file={image}
                error={isError && !image ? "Please select an image." : ""}
            />
        </Modal>
    );
}