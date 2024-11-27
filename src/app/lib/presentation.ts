import { AxiosRequestConfig } from "axios";
import { RequestFilterType } from "@/types/request";
import { CreatePresentationType, UpdatePresentationType } from "@/types/presentation";
import { createRequestFilters } from "@/utils/request";
import { uploadFile } from "@/utils/upload";
import { isValidUrl } from "@/utils/text";
import { fetchAPIWithAuth } from "./api";
import { getPresentationPlaceholderImage, getPresentationUploadFilePath } from "./app";

const routePrefix = '/presentation';
export async function fetchPresentation(endpoint: string, options: AxiosRequestConfig = {}) {
    return fetchAPIWithAuth(`${routePrefix}${endpoint}`, options);
}
export const presentationService = {
    list: async (filters?: RequestFilterType) => {
        try {
            if (!filters) {
                filters = {
                    select: ['id', 'name', 'thumbnailImage', 'userId', 'status', 'createdAt', 'updatedAt', 'deletedAt'],
                    limit: 25,
                    orderBy: { 'createdAt': 'DESC' },
                    include: { User: true }
                }
            }
            const requestData = createRequestFilters(filters);
            return await fetchPresentation('/list', { method: 'POST', data: requestData });
        } catch (error) {
            console.error('Presentation list error:', error);
            throw error;
        }
    },
    get: async (id: string) => {
        try {
            const filters = {
                select: ['id', 'name', 'thumbnailImage', 'userId', 'status', 'createdAt', 'updatedAt', 'deletedAt'],
                where: { id },
                include: { User: true }
            };
            const requestData = createRequestFilters(filters);
            return await fetchPresentation('/get', { method: 'POST', data: requestData });
        } catch (error) {
            console.error('Presentation get error:', error);
            throw error;
        }
    },
    create: async (data: CreatePresentationType) => {
        try {
            let thumbnailImageName = '';
            if (data?.thumbnailImage instanceof File) {
                const uploadFileResponse = await uploadFile(data.thumbnailImage, 'presentations');
                if (uploadFileResponse?.success && uploadFileResponse?.data?.fileName) {
                    thumbnailImageName = uploadFileResponse.data.fileName;
                } else {
                    throw new Error(uploadFileResponse.message || 'File upload failed.');
                }
            }

            const requestData = {
                ...data,
                thumbnailImage: thumbnailImageName || null
            };

            return await fetchPresentation('/create', { method: 'POST', data: requestData });
        } catch (error) {
            console.error('Presentation create error:', error);
            throw error;
        }
    },
    update: async (id: string, data: UpdatePresentationType) => {
        try {

        } catch (error) {
            console.error('Presentation update error:', error);
            throw error;
        }
    },
    delete: async (id: string) => {
        try {

        } catch (error) {
            console.error('Presentation delete error:', error);
            throw error;
        }
    },
    restore: async (id: string) => {
        try {

        } catch (error) {
            console.error('Presentation restore error:', error);
            throw error;
        }
    }
};

export function getPresentationImageUrl(imagePath?: string | null): string {
    if (!imagePath) {
        return getPresentationPlaceholderImage();
    }
    if (isValidUrl(imagePath)) {
        return imagePath;
    }
    return `${getPresentationUploadFilePath()}/${imagePath}`;
}
