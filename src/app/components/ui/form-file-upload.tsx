import React, { useRef } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { ImageDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FileUploadProps<T extends FieldValues> {
    control: Control<T>;
    id?: string;
    name: Path<T>;
    label?: string;
    accept?: string;
    className?: string;
    isDisabled?: boolean;
}

export function FormFileUpload<T extends FieldValues>({
    control,
    id,
    name,
    label,
    accept = 'image/*',
    className,
    isDisabled,
}: FileUploadProps<T>) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onFileInputClick = () => {
        fileInputRef.current?.click();
    };

    const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
        if (e.target.files && e.target.files[0]) {
            field.onChange(e.target.files[0]);
        }
    };

    return (
        <FormField
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel htmlFor={id} className="text-xs font-semibold text-tertiary">
                        {label}
                    </FormLabel>
                    <div
                        className={cn(
                            "flex items-center justify-between p-2 border border-dashed rounded-md cursor-pointer",
                            fieldState?.error ? "border-primary" : field.value ? "border-primary" : "border-[#BDBFC5]",
                            field.value ? "text-[#242424]" : "text-[#9aa0ab]",
                            className
                        )}
                        onClick={onFileInputClick}
                    >
                        <div className="w-full flex items-center justify-between space-x-3">
                            <ImageDown className="w-6 h-6 font-normal flex-shrink-0" />
                            <span className="text-[10px] leading-4 line-clamp-1">
                                {field.value ? field.value.name : "Upload a picture for your presentation thumbnail. PNG or JPG (rec 16:9)"}
                            </span>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-5 text-[8px] font-normal leading-3 py-1 px-2 border-[#9AA0AB] flex-shrink-0"
                            >
                                {field.value ? "Change" : "Browse"}
                            </Button>
                        </div>
                    </div>
                    <Input
                        id={id}
                        type="file"
                        ref={fileInputRef}
                        accept={accept}
                        onChange={(e) => handleInputOnChange(e, field)}
                        disabled={isDisabled}
                        className="hidden"
                    />
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}