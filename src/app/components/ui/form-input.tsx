import { Control } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FormInputProps {
    control: Control<any, any>;
    id?: string;
    type?: string;
    name: string;
    value?: any;
    label?: string;
    placeholder?: string;
    className?: string;
}

export function FormInput({
    control,
    id,
    type = 'text',
    name,
    value,
    label,
    placeholder,
    className,
}: FormInputProps) {
    return (
        <FormField
            name={name}
            control={control}
            render={({ field, fieldState, formState }) => {
                if (value) field.value = value;

                return (
                    <FormItem>
                        <FormLabel htmlFor={id} className="text-xs font-semibold text-tertiary">
                            {label}
                        </FormLabel>
                        <Input
                            id={id}
                            type={type}
                            placeholder={placeholder}
                            disabled={formState.isSubmitting}
                            className={cn(
                                "border-[#BDBFC5] text-sm !ring-0 !ring-offset-0 focus:border-primary focus:ring-0 focus:outline-none placeholder:text-[#9AA0AB] placeholder:text-xs",
                                fieldState?.error && "border-primary",
                                className
                            )}
                            {...field}
                        />
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    );
}