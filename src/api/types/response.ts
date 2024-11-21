export type ResponseData = {
    success: boolean;
    status: number;
    message: string | null;
    data: any;
    errors: any;
    date: string;
};
export type ResponseMetaData = {
    perPage: number;
    currentPage: number;
    lastPage: number;
    total: number;
};
export type PaginatedResponseData = {
    meta: ResponseMetaData;
    items: [] | null;
};