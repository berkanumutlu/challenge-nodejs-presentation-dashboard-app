import { z } from "zod";

export type CreatePresentationType = {
    name: string;
    thumbnailImage?: File | null;
}
export type UpdatePresentationType = {
    name?: string;
    thumbnailImage?: File | null;
}

export const createPresentationFormSchema = z.object({
    name: z.string().min(1, {
        message: 'Presentation name is required.'
    }).max(100),
    thumbnailImage: z.instanceof(File).nullable()
});
export type CreatePresentationFormValues = z.infer<typeof createPresentationFormSchema>;