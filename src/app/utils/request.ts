import { RequestFilterType } from "@/types/request";

export function createRequestFilters({ where, select, limit, include, offset, orderBy }: RequestFilterType) {
    return {
        "filters": {
            ...(where && { where }),
            ...(select && { select }),
            ...(include && { include }),
            ...(limit && { limit }),
            ...(offset && { offset }),
            ...(orderBy && { orderBy })
        }
    };
}