"use client";

import React, { useEffect, useState } from "react";
import PresentationList from "@/components/presentation/presentation-list";
import PresentationCreateList from "@/components/presentation/presentation-create-list";
import { fetchPresentations } from "@/lib/presentation";

export default function DashboardPageClient() {
    const [presentations, setPresentations] = useState<any>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        fetchPresentations().then((data) => setPresentations(data));
    }, []);

    const handleRename = (id: string, newName: string) => {
        setPresentations((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                items: prevState.data.items.map((item) =>
                    item.id === id ? { ...item, name: newName } : item
                )
            }
        }));
    };

    const handleDelete = (id: string) => {
        setPresentations((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                items: prevState.data.items.filter((item) => item.id !== id),
                meta: {
                    ...prevState.data.meta,
                    total: prevState.data.meta.total - 1
                }
            }
        }));
    };

    const handleCreate = (name: string, image: File | null) => {
        const newPresentation = {
            id: Date.now().toString(),
            name,
            thumbnailImage: image ? URL.createObjectURL(image) : null,
            status: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deletedAt: null,
            User: presentations.data.items[0].User
        };

        setPresentations((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                items: [newPresentation, ...prevState.data.items],
                meta: {
                    ...prevState.data.meta,
                    total: prevState.data.meta.total + 1
                }
            }
        }));
    };

    return (
        <>
            <PresentationCreateList
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                handleCreate={handleCreate}
            />
            <PresentationList
                presentations={presentations}
                onRename={handleRename}
                onDelete={handleDelete}
            />
        </>
    );
}
