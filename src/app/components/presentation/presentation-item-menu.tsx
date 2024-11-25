import { ClipboardPen, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";

interface PresentationItemMenuProps {
    onRenameClick: () => void;
    onDeleteClick: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function PresentationItemMenu({ onRenameClick, onDeleteClick, isOpen, setIsOpen }: PresentationItemMenuProps) {
    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 text-[#9AA0AB]">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => { onRenameClick(); setIsOpen(false); }}>
                    <ClipboardPen className="mr-2 w-4 h-4" />
                    <span className="text-xs">Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => { onDeleteClick(); setIsOpen(false); }} className="text-red-600">
                    <Trash2 className="mr-2 w-4 h-4" />
                    <span className="text-xs">Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
