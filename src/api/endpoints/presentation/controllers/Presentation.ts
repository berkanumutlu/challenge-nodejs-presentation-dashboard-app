import { Request, Response, Next } from "@/types/request";
import { PresentationModelConfig, UserModelConfig } from "@/types/models";
import { createPaginatedResponseData } from "@/middlewares/responseHandler";
import { prepareRequestFilters } from "@/utils/request";
import { isAdminUser } from "@/utils/auth";
import { filterHiddenFields, filterGuardedFields } from "@/utils/model";
import * as PresentationService from "../services/Presentation";

export async function list(req: Request, res: Response, next: Next) {
    try {
        const { filters } = req.body;

        if (filters?.include) {
            filters.include = { User: true, ...filters.include };
        }
        let requestFilter = await prepareRequestFilters(filters, req, PresentationModelConfig, UserModelConfig);
        if (!isAdminUser(req)) {
            requestFilter.where = {
                userId: req.user.id,
                User: {
                    status: true
                },
                ...requestFilter?.where
            };
        }

        const records = await PresentationService.list(requestFilter);
        const count = await PresentationService.count(requestFilter);

        return res.success(createPaginatedResponseData(records, count, filters?.limit, filters?.offset));
    } catch (err) {
        next(err);
    }
};
export async function get(req: Request, res: Response, next: Next) {
    try {
        const { filters } = req.body;

        if (!filters || !filters?.where) return res.warning('Please provide where.', 400);

        if (filters?.include) {
            filters.include = { User: true, ...filters.include };
        }
        let requestFilter = await prepareRequestFilters(filters, req, PresentationModelConfig, UserModelConfig);
        if (!isAdminUser(req)) {
            if (!Object.hasOwn(filters?.where, 'id')) return res.warning('Please provide id.', 400);
            requestFilter.where = {
                userId: req.user.id,
                User: {
                    status: true
                },
                ...requestFilter?.where
            };
        }

        const record = await PresentationService.get(requestFilter);
        if (!record) return res.warning('Presentation not found.', 404);

        return res.success(record);
    } catch (err) {
        next(err);
    }
};
export async function create(req: Request, res: Response, next: Next) {
    try {
        let requestData = req.body;

        if (!isAdminUser(req)) {
            requestData = await filterGuardedFields(requestData, req, PresentationModelConfig);
        }
        if (!requestData.name || requestData.name.trim().length < 3) return res.warning('The name field cannot be less than 3 characters.', 400);
        requestData.userId = req.user.id;

        const newRecord = await PresentationService.create(requestData);
        const responseData = !isAdminUser(req) ? await filterHiddenFields(newRecord, req, PresentationModelConfig, ['userId']) : newRecord;

        return res.success(responseData, 'The Presentation has been created successfully.', 201);
    } catch (err) {
        next(err);
    }
};
export async function update(req: Request, res: Response, next: Next) {
    try {
        const { filters, fields } = req.body;

        if (!filters || !filters?.where) return res.warning('Please provide filters.', 400);
        if (!fields || Object.keys(fields).length === 0) return res.warning('Please provide fields.', 400);
        if (Object.hasOwn(fields, 'name') && fields?.name?.trim()?.length < 3) return res.warning('The name field cannot be less than 3 characters.', 400);

        const requestFilter = await prepareRequestFilters(filters);
        let requestFields = fields;
        if (!isAdminUser(req)) {
            if (!Object.hasOwn(requestFilter?.where, 'id')) return res.warning('Please provide id.', 400);
            requestFilter.where = { userId: req.user.id, ...requestFilter?.where };
            requestFields = await filterGuardedFields(fields, req, PresentationModelConfig);
        }

        const record = await PresentationService.getActive(requestFilter);
        if (!record) return res.warning('Presentation not found.', 404);

        const updatedRecord = await PresentationService.update(requestFilter.where, requestFields);
        if (updatedRecord[0] === 0) return res.warning('The presentation has not been updated.', 200);
        const responseData = await filterHiddenFields(requestFields, req, PresentationModelConfig);

        return res.success(responseData, 'The Presentation has been updated successfully.');
    } catch (err) {
        next(err);
    }
};
export async function deleteRecord(req: Request, res: Response, next: Next) {
    try {
        const { filters } = req.body;

        if (!filters || !filters?.where) return res.warning('Please provide filters.', 400);

        const requestFilter = await prepareRequestFilters(filters);
        if (!isAdminUser(req)) {
            if (!Object.hasOwn(requestFilter?.where, 'id')) return res.warning('Please provide id.', 400);
            requestFilter.where = { userId: req.user.id, ...requestFilter?.where };
        }

        const record = await PresentationService.getActive(requestFilter);
        if (!record) return res.warning('Presentation not found.', 404);

        await PresentationService.softDeleteRecord(record);

        return res.success(null, 'The Presentation has been deleted successfully.');
    } catch (err) {
        next(err);
    }
};
export async function restore(req: Request, res: Response, next: Next) {
    try {
        const { filters } = req.body;

        if (!filters || !filters?.where) return res.warning('Please provide filters.', 400);

        const requestFilter = await prepareRequestFilters(filters);
        requestFilter.where = {
            ...requestFilter.where,
            deletedAt: { not: null },
        };
        if (!isAdminUser(req)) {
            if (!Object.hasOwn(requestFilter?.where, 'id')) return res.warning('Please provide id.', 400);
            requestFilter.where = { userId: req.user.id, ...requestFilter?.where };
        }

        const record = await PresentationService.getActive(requestFilter);
        if (!record) return res.warning('Presentation not found.', 404);
        const restoredRecord = await PresentationService.restore(record);
        const responseData = await filterHiddenFields(restoredRecord, req, PresentationModelConfig);

        return res.success(responseData, 'The Presentation has been restored successfully.');
    } catch (err) {
        next(err);
    }
};