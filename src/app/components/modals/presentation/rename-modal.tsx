"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { FormInput } from "@/components/ui/form-input";

interface RenamePresentationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRename: (newName: string) => void;
    currentName: string;
}

export function RenamePresentationModal({ isOpen, onClose, onRename, currentName }: RenamePresentationModalProps) {
    const [newName, setNewName] = useState(currentName);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRename = () => {
        if (newName.trim() === "") {
            setIsError(true);
            return;
        }
        setIsLoading(true);
        onRename(newName.trim());
        setTimeout(() => {
            setNewName("");
            setIsError(false);
            setIsLoading(false);
            onClose();
        }, 3000); // Simulating API call
    };

    const isFormValid = newName.trim() !== "";

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Rename Presentation"
            onButtonClick={handleRename}
            buttonText="Rename"
            isLoading={isLoading}
            isSubmitDisabled={!isFormValid}
        >
            <FormInput
                id="name"
                label="New Presentation Name"
                value={newName}
                isDisabled={isLoading}
                onChange={setNewName}
                placeholder="Enter new presentation name"
                error={isError && newName.trim() === "" ? "Please enter a valid name." : ""}
            />
        </Modal>
    );
}