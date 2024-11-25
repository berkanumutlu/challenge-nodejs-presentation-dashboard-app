import React, { useRef } from "react";
import { ImageDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
    id: string;
    label: string;
    onChange: (file: File | null) => void;
    error?: string;
    accept?: string;
    file: File | null;
    isDisabled?: boolean;
}

export function FileUpload({
    id,
    label,
    onChange,
    error,
    accept = "image/*",
    file,
    isDisabled
}: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onChange(e.target.files[0]);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-xs font-semibold text-tertiary">{label}</Label>
            <div
                className={cn(
                    "flex items-center justify-between p-2 border border-dashed rounded-md cursor-pointer",
                    error ? "border-primary" : file ? "border-primary" : "border-[#BDBFC5]",
                    file ? "text-[#242424]" : "text-[#9aa0ab]"
                )}
                onClick={triggerFileInput}
            >
                <div className="w-full flex items-center justify-between space-x-3">
                    <ImageDown className="w-6 h-6 font-normal flex-shrink-0" />
                    <span className="text-[10px] leading-4 line-clamp-1">
                        {file ? file.name : "Upload a picture for your presentation thumbnail. PNG or JPG (rec 16:9)"}
                    </span>
                    <Button type="button" variant="outline" size="sm" className="h-5 text-[8px] font-normal leading-3 py-1 px-2 border-[#9AA0AB] flex-shrink-0">
                        {file ? "Change" : "Browse"}
                    </Button>
                </div>
            </div>
            <Input
                id={id}
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={accept}
                disabled={isDisabled}
                className="hidden"
            />
            {error && (
                <p className="text-sm text-primary">{error}</p>
            )}
        </div>
    );
}