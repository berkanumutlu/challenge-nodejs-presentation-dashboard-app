import { RequestFieldsDataType, RequestFieldsType, RequestFilterType } from "@/types/request";

export function createRequestFilters({ where, select, limit, include, offset, orderBy }: RequestFilterType) {
    return {
        filters: {
            ...(where && { where }),
            ...(select && { select }),
            ...(include && { include }),
            ...(limit && { limit }),
            ...(offset && { offset }),
            ...(orderBy && { orderBy })
        }
    };
}

export function createRequestFields(fields?: RequestFieldsDataType | RequestFieldsDataType[] | null): RequestFieldsType {
    if (!fields) {
        return {};
    }

    if (Array.isArray(fields)) {
        const transformedFields = fields.reduce((acc, field) => {
            return { ...acc, ...field };
        }, {});
        return {
            fields: transformedFields
        };
    } else if (typeof fields === "object") {
        return {
            fields
        };
    }

    return {};
}