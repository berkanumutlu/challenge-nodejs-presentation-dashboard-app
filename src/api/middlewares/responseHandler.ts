import { appConfig } from "@/config";
import { Request, Response, Next } from "@/types/request";
import { PaginatedResponseData, ResponseData } from "@/types/response";

const createResponse = (
    success: boolean = false,
    status: number = 500,
    message: string | null,
    data: any = null,
    errors: any = null
): ResponseData => {
    return {
        success,
        status,
        message,
        data,
        errors,
        date: new Date().toISOString()
    };
};
export const createPaginatedResponseData = (
    data: any,
    total: number = data?.length ?? 0,
    limit?: number,
    offset?: number
): PaginatedResponseData => {
    limit = limit ?? 0;
    offset = offset ?? 0;
    let currentPage: number = 1, lastPage: number = 1;
    if (limit && limit !== 0) {
        currentPage = Math.floor(offset / limit) + 1;
        lastPage = Math.ceil(total / limit);
    }
    return {
        meta: {
            perPage: limit,
            currentPage,
            lastPage,
            total
        },
        items: data
    };
};
const responseHandler = (req: Request, res: Response, next: Next): void => {
    res.success = (data: any, message: string = 'Success', status: number = 200): void => {
        res.status(status).json(createResponse(true, status, message, data));
    };
    res.warning = (message: string = 'Warning', status: number = 200): void => {
        res.status(status).json(createResponse(false, status, message));
    };
    res.error = (err: any, message: string = 'Error', status: number = 500): void => {
        let errors = err;
        // If in a production environment, more meaningful messages are displayed.
        if (appConfig?.env === 'production') {
            let errorMessages: { message: string }[] = [];
            if (err?.errors) {
                err.errors.forEach((error: { message: string }) => errorMessages.push({ message: error.message }));
            } else {
                errorMessages.push({ message: err.message });
            }
            errors = errorMessages;
        }
        res.status(status).json(createResponse(false, status, message, null, errors));
    };
    next();
};

export default responseHandler;