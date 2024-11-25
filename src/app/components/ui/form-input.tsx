import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    className?: string;
    isDisabled?: boolean;
}

export function FormInput({
    id,
    label,
    value,
    onChange,
    placeholder,
    error,
    className,
    isDisabled
}: FormInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-xs font-semibold text-tertiary">{label}</Label>
            <Input
                id={id}
                value={value}
                placeholder={placeholder}
                disabled={isDisabled}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                    "border-[#BDBFC5] text-sm !ring-0 !ring-offset-0 placeholder:text-[#9AA0AB] placeholder:text-xs",
                    "focus:border-primary focus:ring-0 focus:outline-none",
                    error && "border-primary",
                    className
                )}
            />
            {error && (
                <p className="text-sm text-primary">{error}</p>
            )}
        </div>
    );
}