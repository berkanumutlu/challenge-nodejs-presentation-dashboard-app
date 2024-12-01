import { useCallback } from "react";
import { ClipboardPen, Trash2 } from "lucide-react";
import { useModal } from "@/store/useModal";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";

interface PresentationItemMenuProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    data?: any;
}

export function PresentationItemMenu({ isOpen, setIsOpen, data }: PresentationItemMenuProps) {
    const { onModalOpen } = useModal();

    const onClickEdit = useCallback(() => {
        onModalOpen('EditPresentationModal', { presentation: data });
        setIsOpen(false);
    }, [data, onModalOpen, setIsOpen]);

    const onClickDelete = useCallback(() => {
        onModalOpen('DeletePresentationModal', { presentation: data });
        setIsOpen(false);
    }, [data, onModalOpen, setIsOpen]);

    return (
        <>
            <div
                className={cn(
                    "absolute top-4 right-4",
                    isOpen && "z-10"
                )}
            >
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={onClickEdit}>
                            <ClipboardPen className="mr-2 w-4 h-4" />
                            <span className="text-xs">Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onClickDelete} className="text-red-600">
                            <Trash2 className="mr-2 w-4 h-4" />
                            <span className="text-xs">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
}