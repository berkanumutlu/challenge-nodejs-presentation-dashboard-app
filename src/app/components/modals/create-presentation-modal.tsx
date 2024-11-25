"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Ellipsis, ImageDown } from 'lucide-react';

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
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        }, 1000); // Simulating API call
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setIsError(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const isFormValid = name.trim() !== "" && image !== null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Presentation</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-semibold text-tertiary">Presentation Name</Label>
                        <Input
                            id="name"
                            value={name}
                            placeholder="Type your presentation name here."
                            onChange={(e) => {
                                setName(e.target.value);
                                setIsError(false);
                            }}
                            className={cn(
                                "border-[#BDBFC5] text-sm !ring-0 !ring-offset-0 placeholder:text-[#9AA0AB] placeholder:text-xs",
                                "focus:border-primary focus:ring-0 focus:outline-none",
                                isError && name.trim() === "" && "border-primary"
                            )}
                        />
                        {isError && name.trim() === "" && (
                            <p className="text-sm text-primary">Please enter a valid name.</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image" className="text-xs font-semibold text-tertiary">Presentation Thumbnail</Label>
                        <div
                            className={cn(
                                "flex items-center justify-between p-2 border border-dashed rounded-md cursor-pointer",
                                isError && image === null && "border-primary",
                                image ? "text-[#242424] border-primary" : "text-[#9aa0ab]"
                            )}
                            onClick={triggerFileInput}
                        >
                            <div className="w-full flex items-center justify-between space-x-3">
                                <ImageDown className="w-6 h-6 font-normal" />
                                <span className="text-[10px] leading-4 line-clamp-1">
                                    {image ? image.name : "Upload a picture for your presentation thumbnail. PNG or JPG (rec 16:9)"}
                                </span>
                                <Button type="button" variant="outline" size="sm" className="h-5 text-[8px] font-normal leading-3 py-1 px-2 border-[#9AA0AB]">
                                    {image ? "Change" : "Browse"}
                                </Button>
                            </div>
                        </div>
                        <Input
                            id="image"
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        {isError && !image && (
                            <p className="text-sm text-primary">Please select an image.</p>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={handleCreate}
                        disabled={isLoading}
                        className={cn(
                            "text-white",
                            isFormValid ? "bg-primary hover:bg-primary-dark" : "bg-[#CCCCCC] hover:bg-[#a4a4a4]"
                        )}
                    >
                        {isLoading ? (
                            <Ellipsis className="!w-10 !h-10 animate-pulse" />
                        ) : (
                            "Create"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}