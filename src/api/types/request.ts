import { Response as ExpressResponse, Request as ExpressRequest, NextFunction } from "express";
import { UserModelType } from "./models";

export type Request = ExpressRequest & AuthenticatedRequest;
export type Response = ExpressResponse & {
    success: (data: any, message?: string, status?: number) => void;
    warning: (message?: string, status?: number) => void;
    error: (err: any, message?: string, status?: number) => void;
};
export type Next = NextFunction;
export type AuthenticatedRequest = ExpressRequest & {
    token: string;
    user: UserModelType;
};
export type RequestFilterType = {
    select?: string[] | string,
    selectInclude?: string[] | string,
    where?: Record<string, any>,
    limit?: number,
    offset?: number,
    order?: Record<string, 'ASC' | 'DESC'>
};