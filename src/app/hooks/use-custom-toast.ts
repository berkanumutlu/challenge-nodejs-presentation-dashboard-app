import { useToast } from "@/hooks/use-toast";

export function useCustomToast() {
    const { toast } = useToast();

    return {
        showSuccessToast: (props: { title: string; description?: string }) =>
            toast({
                ...props,
                variant: "success"
            }),
        showInfoToast: (props: { title: string; description?: string }) =>
            toast({
                ...props,
                variant: "info"
            }),
        showWarningToast: (props: { title: string; description?: string }) =>
            toast({
                ...props,
                variant: "warning"
            }),
        showErrorToast: (props: { title: string; description?: string }) =>
            toast({
                ...props,
                variant: "destructive"
            })
    };
}