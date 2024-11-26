export type CreatePresentationType = {
    name: string;
    thumbnailImage: File;
}
export type UpdatePresentationType = {
    name?: string;
    thumbnailImage?: File;
}