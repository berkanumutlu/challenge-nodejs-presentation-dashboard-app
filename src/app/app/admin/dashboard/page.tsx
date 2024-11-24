"use client";

import React, { useState, useEffect } from "react";
import { Plus, Sparkles } from "lucide-react";
import PresentationItem from "@/components/presentation/presentation-item";
import { RenameModal } from "@/components/presentation/rename-modal";
import { CreatePresentationModal } from "@/components/presentation/create-presentation-modal";

async function fetchPresentations() {
    return {
        "success": true,
        "status": 200,
        "message": "Success",
        "data": {
            "meta": {
                "perPage": 5,
                "currentPage": 1,
                "lastPage": 1,
                "total": 3
            },
            "items": [
                {
                    "id": "95b0f26e-df72-4a3a-9186-594e75384fcb",
                    "name": "Test Presentation",
                    "thumbnailImage": null,
                    "status": true,
                    "createdAt": "2024-11-21T15:53:46.424Z",
                    "updatedAt": "2024-11-21T16:00:16.328Z",
                    "deletedAt": null,
                    "User": {
                        "firstName": "test",
                        "lastName": "user",
                        "email": "test_user@example.com",
                        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJjE8yzVc7WmHzo22TuZwaccsTulC5ot32V1s3Nt4MeE97O9w=s83-c-mo",
                        "createdAt": "2024-11-21T10:59:58.023Z"
                    }
                },
                {
                    "id": "9996b8bb-005e-4c5b-b330-8115c38dff30",
                    "name": "Edited Presentation Name",
                    "thumbnailImage": null,
                    "status": true,
                    "createdAt": "2024-11-21T13:42:01.777Z",
                    "updatedAt": "2024-11-21T15:13:21.621Z",
                    "deletedAt": null,
                    "User": {
                        "firstName": "test",
                        "lastName": "user",
                        "email": "test_user@example.com",
                        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJjE8yzVc7WmHzo22TuZwaccsTulC5ot32V1s3Nt4MeE97O9w=s83-c-mo",
                        "createdAt": "2024-11-21T10:59:58.023Z"
                    }
                },
                {
                    "id": "ecb50e69-b998-43cf-b3d5-0b300aea614a",
                    "name": "Test Presentation 2",
                    "thumbnailImage": "https://www.teamsli.de/wp-content/uploads/2016/06/bigstock-Businesswoman-Presenting-Finan-308463130.jpg",
                    "status": true,
                    "createdAt": "2024-11-21T11:48:58.223Z",
                    "updatedAt": "2024-11-21T11:51:03.214Z",
                    "deletedAt": null,
                    "User": {
                        "firstName": "test",
                        "lastName": "user",
                        "email": "test_user@example.com",
                        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJjE8yzVc7WmHzo22TuZwaccsTulC5ot32V1s3Nt4MeE97O9w=s83-c-mo",
                        "createdAt": "2024-11-21T10:59:58.023Z"
                    }
                }
            ]
        },
        "errors": null,
        "date": "2024-11-22T20:01:39.410Z"
    }
}

export default function Dashboard() {
    const [presentations, setPresentations] = useState<any>(null)
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [currentPresentationId, setCurrentPresentationId] = useState<string | null>(null)

    useEffect(() => {
        fetchPresentations().then(data => setPresentations(data));
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
        }))
    }

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
        }))
    }

    const handleCreate = (name: string, image: File | null) => {
        const newPresentation = {
            id: Date.now().toString(), // Use a proper UUID in a real application
            name: name,
            thumbnailImage: image ? URL.createObjectURL(image) : null,
            status: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deletedAt: null,
            User: presentations.data.items[0].User // Use the first user as a placeholder
        }

        setPresentations(prevState => ({
            ...prevState,
            data: {
                ...prevState.data,
                items: [newPresentation, ...prevState.data.items],
                meta: {
                    ...prevState.data.meta,
                    total: prevState.data.meta.total + 1
                }
            }
        }))
    }

    const openRenameModal = (id: string) => {
        setCurrentPresentationId(id)
        setIsRenameModalOpen(true)
    }

    const closeRenameModal = () => {
        setIsRenameModalOpen(false)
        setCurrentPresentationId(null)
    }

    if (!presentations) return <div>Loading...</div>

    const currentPresentation = presentations.data.items.find(item => item.id === currentPresentationId)

    return (
        <>
            <div className="space-y-5 mb-5">
                <h3 className="text-sm font-medium text-tertiary">Create a presentation</h3>
                <div className="flex flex-row gap-x-4">
                    <div
                        className="h-40 w-72 space-y-2 flex flex-col justify-center items-center bg-white rounded-sm shadow-md hover:shadow-lg cursor-pointer"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <div className="p-3 inline-flex bg-primary rounded-sm text-white">
                            <Plus width={25} height={25} />
                        </div>
                        <p className="text-sm font-bold text-primary text-center">Create a new presentation</p>
                    </div>
                    <div className="h-40 w-72 bg-white rounded-sm">
                        <div className="space-x-4 h-full flex flex-col md:flex-row justify-center items-center bg-gradient-to-tr from-primary to-secondary hover:shadow-lg text-white rounded-sm cursor-pointer">
                            <Sparkles />
                            <p className="text-lg font-bold">Create with AI</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-5 mb-5">
                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-tertiary">Decks</h3>
                    <h4 className="text-xs font-medium text-[#9AA0AB]">
                        {presentations.data.meta.total} files
                    </h4>
                </div>
                <div className="flex flex-wrap gap-5">
                    {presentations.data.items.map((presentation: any) => (
                        <PresentationItem
                            key={presentation.id}
                            data={presentation}
                            onRenameClick={() => openRenameModal(presentation.id)}
                            onDelete={() => handleDelete(presentation.id)}
                        />
                    ))}
                </div>
            </div>
            {currentPresentation && (
                <RenameModal
                    isOpen={isRenameModalOpen}
                    onClose={closeRenameModal}
                    onRename={(newName) => {
                        handleRename(currentPresentation.id, newName)
                        closeRenameModal()
                    }}
                    currentName={currentPresentation.name}
                />
            )}
            <CreatePresentationModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreate}
            />
        </>
    )
}