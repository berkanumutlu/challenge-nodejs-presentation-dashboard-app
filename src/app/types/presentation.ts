import { z } from "zod";
import { UserItemType } from "./user";

export type CreatePresentationType = {
    name: string;
    thumbnailImage?: File | null;
}

export type UpdatePresentationType = {
    name?: string;
    thumbnailImage?: File | null;
}

export type PresentationItemType = {
    id: number | string;
    name: string;
    thumbnailImage: string | null;
    status: boolean;
    createdAt: Date | string;
    updatedAt: Date | string | null;
    deletedAt: Date | string | null;
    User: UserItemType
}

export const createPresentationFormSchema = z.object({
    name: z.string().min(1, {
        message: 'Presentation name is required.'
    }).max(100),
    thumbnailImage: z.instanceof(File).nullable()
});
export type CreatePresentationFormValues = z.infer<typeof createPresentationFormSchema>;

export const editPresentationFormSchema = z.object({
    name: z.string().min(1, {
        message: 'Presentation name is required.'
    }).max(100),
    thumbnailImage: z.instanceof(File).nullable()
});
export type EditPresentationFormValues = z.infer<typeof editPresentationFormSchema>;