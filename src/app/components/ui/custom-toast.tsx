"use client";

import { Info, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function CustomToast() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(({ id, title, description, action, ...props }) => {
                const Icon = {
                    default: Info,
                    destructive: XCircle,
                }[props.variant || 'default'];

                return (
                    <Toast key={id} {...props}>
                        <div className="grid gap-1">
                            {Icon && <Icon className="h-4 w-4" />}
                            <div className="flex items-center gap-3">
                                {title && <ToastTitle>{title}</ToastTitle>}
                                {description && (<ToastDescription>{description}</ToastDescription>)}
                            </div>
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}

export function useCustomToast() {
    const { toast } = useToast();

    return {
        showSuccessToast: (props: { title: string; description?: string }) =>
            toast({
                ...props,
                variant: "default",
                className: cn(
                    "bg-green-500 text-white border-green-600 dark:bg-green-700 dark:border-green-800"
                )
            }),
        showInfoToast: (props: { title: string; description?: string }) =>
            toast({
                ...props,
                variant: "default",
                className: cn(
                    "bg-blue-500 text-white border-blue-600 dark:bg-blue-700 dark:border-blue-800"
                )
            }),
        showWarningToast: (props: { title: string; description?: string }) =>
            toast({
                ...props,
                variant: "default",
                className: cn(
                    "bg-yellow-500 text-white border-yellow-600 dark:bg-yellow-700 dark:border-yellow-800"
                )
            }),
        showErrorToast: (props: { title: string; description?: string }) =>
            toast({
                ...props,
                variant: "destructive",
                className: cn(
                    "bg-red-500 text-white border-red-600 dark:bg-red-700 dark:border-red-800"
                )
            }),
    };
}