import { ClipboardPen, MoreHorizontal, Trash } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PresentationItemMenuProps {
    onRenameClick: () => void
    onDelete: () => void
}

export function PresentationItemMenu({ onRenameClick, onDelete }: PresentationItemMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={onRenameClick}>
                    <ClipboardPen />
                    <span className="text-xs">Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={onDelete}>
                    <Trash />
                    <span className="text-xs">Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}