import { useState } from "react"
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
import { Label } from "@/components/ui/label"

interface CreatePresentationModalProps {
    isOpen: boolean
    onClose: () => void
    onCreate: (name: string, image: File | null) => void
}

export function CreatePresentationModal({ isOpen, onClose, onCreate }: CreatePresentationModalProps) {
    const [name, setName] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [isError, setIsError] = useState(false)

    const handleCreate = () => {
        if (name.trim()) {
            onCreate(name.trim(), image)
            setName("")
            setImage(null)
            setIsError(false)
            onClose()
        } else {
            setIsError(true)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Presentation</DialogTitle>
                    <DialogDescription>
                        Enter a name and upload an image for your new presentation.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                setIsError(false)
                            }}
                            className={isError ? "border-primary focus-visible:ring-primary" : ""}
                        />
                        {isError && (
                            <p className="text-sm text-primary">Please enter a valid name.</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleCreate} className="hover:!bg-primary">
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}