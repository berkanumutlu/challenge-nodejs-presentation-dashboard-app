import { ClipboardPen, Ellipsis, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";

export function PresentationItemMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="text-[#9AA0AB] cursor-pointer"><Ellipsis /></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-56">
                <DropdownMenuItem>
                    <ClipboardPen />
                    <span className="text-xs">Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Trash />
                    <span className="text-xs">Trash</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
