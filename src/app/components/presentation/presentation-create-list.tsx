"use client";

import React from "react";
import { Plus, Sparkles } from "lucide-react";
import { CreatePresentationModal } from "@/components/modals/presentation/create-modal";

interface PresentationCreateListProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    handleCreate: (name: string, image: File | null) => void;
}

export default function PresentationCreateList({
    isCreateModalOpen,
    setIsCreateModalOpen,
    handleCreate
}: PresentationCreateListProps) {
    return (
        <>
            <div className="space-y-5 mb-5">
                <h3 className="text-sm font-medium text-tertiary">
                    Create a presentation
                </h3>
                <div className="flex flex-row gap-x-4">
                    <div
                        className="h-40 w-72 space-y-2 flex flex-col justify-center items-center bg-white rounded-sm shadow-[5px_5px_8px_0px_rgba(0,0,0,.05)] hover:shadow-[5px_5px_8px_5px_rgba(0,0,0,.05)] cursor-pointer"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <div className="p-3 inline-flex bg-primary rounded-sm text-white">
                            <Plus width={25} height={25} />
                        </div>
                        <p className="text-sm font-bold text-primary text-center">
                            Create a new presentation
                        </p>
                    </div>
                    <div className="h-40 w-72 bg-white rounded-sm">
                        <div className="space-x-4 h-full flex flex-col md:flex-row justify-center items-center bg-gradient-to-tr from-primary to-secondary text-white shadow-[5px_5px_8px_0px_rgba(0,0,0,.05)] hover:shadow-[5px_5px_8px_5px_rgba(0,0,0,.05)] rounded-sm cursor-pointer">
                            <Sparkles />
                            <p className="text-lg font-bold">Create with AI</p>
                        </div>
                    </div>
                </div>
            </div>
            <CreatePresentationModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreate}
            />
        </>
    );
}
