import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface RenameModalProps {
    isOpen: boolean
    onClose: () => void
    onRename: (newName: string) => void
    currentName: string
}

export function RenameModal({ isOpen, onClose, onRename, currentName }: RenameModalProps) {
    const [newName, setNewName] = useState(currentName)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setNewName(currentName)
        setIsError(false)
    }, [currentName, isOpen])

    const handleRename = () => {
        if (newName.trim()) {
            onRename(newName.trim())
            onClose()
        } else {
            setIsError(true)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rename Presentation</DialogTitle>
                    <DialogDescription>
                        Enter a new name for your presentation.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input
                        id="name"
                        value={newName}
                        onChange={(e) => {
                            setNewName(e.target.value)
                            setIsError(false)
                        }}
                        placeholder="New presentation name"
                        className={cn(
                            isError && "border-primary focus-visible:ring-primary"
                        )}
                    />
                    {isError && (
                        <p className="text-sm text-primary">Please enter a valid name.</p>
                    )}
                </div>
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleRename} className="hover:!bg-primary">
                        Rename
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}