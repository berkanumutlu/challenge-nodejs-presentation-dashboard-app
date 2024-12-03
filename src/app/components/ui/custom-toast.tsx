"use client";

import { CircleCheck, MessageSquare, MessageSquareText, MessageSquareWarning, MessageSquareX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function CustomToast() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(({ id, title, description, action, ...props }) => {
                const Icon = {
                    default: MessageSquare,
                    destructive: MessageSquareX,
                    success: CircleCheck,
                    info: MessageSquareText,
                    warning: MessageSquareWarning
                }[props.variant || 'default'];

                return (
                    <Toast key={id} {...props}>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-row items-center gap-2">
                                {Icon && <Icon className="h-6 w-6" />}
                                {title && <ToastTitle>{title}</ToastTitle>}
                            </div>
                            {description && (<ToastDescription>{description}</ToastDescription>)}
                        </div>
                        {action}
                        <ToastClose className="text-white" />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}