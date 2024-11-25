import React from "react";
import { Ellipsis } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    footerContent?: React.ReactNode;
    isLoading?: boolean;
    onSubmit?: () => void;
    submitText?: string;
    isSubmitDisabled?: boolean;
}

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    footerContent,
    isLoading = false,
    onSubmit,
    submitText = "Submit",
    isSubmitDisabled = false,
}: ModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <div className="space-y-6 py-6">
                    {children}
                </div>
                <DialogFooter>
                    {footerContent || (
                        <Button
                            type="button"
                            onClick={onSubmit}
                            disabled={isLoading}
                            className={cn(
                                "text-white",
                                !isSubmitDisabled ? "bg-primary hover:bg-secondary" : "bg-[#CCCCCC] hover:bg-[#a4a4a4]"
                            )}
                        >
                            {isLoading ? (
                                <Ellipsis className="!w-10 !h-10 animate-pulse" />
                            ) : (
                                submitText
                            )}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}