import { Request, RequestFilterType } from "@/types/request";
import { isAdminUser } from "./auth";
import { filterHiddenFields } from "./model";

export const prepareRequestFilters = async (filters?: RequestFilterType, req?: Request, modelConfig?: any, relatedModelConfig?: any): Promise<any> => {
    let preparedFilters: any = {};

    if (filters) {
        if (filters?.limit && Number.isInteger(filters?.limit)) {
            preparedFilters.take = Number(filters.limit);
        }

        if (filters?.offset && Number.isInteger(filters?.offset)) {
            preparedFilters.skip = Number(filters.offset);
        }

        if (filters?.where) {
            preparedFilters.where = !isAdminUser(req) ? filters.where : await filterHiddenFields(filters?.where, req, modelConfig)

            // filters.where.search operation
            if (filters.where?.search && modelConfig?.searchableAttributes) {
                const search = filters.where.search;
                const searchConditions = modelConfig.searchableAttributes.map((attribute: string) => {
                    const fieldDefinition = modelConfig.searchableAttributes?.[attribute];
                    if (fieldDefinition.type === "String") {
                        return { [attribute]: { contains: search, mode: 'insensitive' } };
                    } else if (fieldDefinition.type === "Float" || fieldDefinition.type === "Int") {
                        return { [attribute]: { equals: parseFloat(search) } };
                    }
                    return null;
                }).filter(Boolean);

                preparedFilters.where = {
                    AND: [
                        preparedFilters.where || {},
                        { OR: searchConditions }
                    ]
                };

                delete (preparedFilters.where as any)['search'];
            }
        }

        if (filters?.select) {
            preparedFilters.select = Array.isArray(filters.select)
                ? filters.select.reduce((acc, field) => ({ ...acc, [field]: true }), {})
                : { [filters.select]: true };

            if (!isAdminUser(req)) {
                preparedFilters.select = await filterHiddenFields(preparedFilters?.select, req, modelConfig);
            }
        } else {
            if (!isAdminUser(req) && modelConfig?.hiddenAttributes) {
                preparedFilters.select = modelConfig.hiddenAttributes
                    .filter(field => !modelConfig.hiddenAttributes.includes(field))
                    .reduce((acc, field) => ({ ...acc, [field]: true }), {});
            }
        }

        if (filters?.include) {
            if (preparedFilters?.select) {
                for (const [key, value] of Object.entries(filters.include)) {
                    if (typeof value === 'object') {
                        if (value?.select) {
                            preparedFilters.select = {
                                ...preparedFilters.select,
                                [key]: { select: await filterHiddenFields(value.select, req, relatedModelConfig) }
                            };
                        }
                        if (value?.where) {
                            preparedFilters.where = {
                                ...preparedFilters.where,
                                [key]: { where: value.where }
                            };
                        }
                    } else if (value === true) {
                        if (!isAdminUser(req) && relatedModelConfig?.visibleAttributes) {
                            preparedFilters.select = {
                                ...preparedFilters.select,
                                [key]: { select: relatedModelConfig.visibleAttributes.reduce((acc, field) => ({ ...acc, [field]: true }), {}) }
                            };
                        } else {
                            preparedFilters.select = {
                                ...preparedFilters.select,
                                [key]: true
                            };
                        }
                    }
                }
            } else {
                preparedFilters.include = filters.include;
                if (!isAdminUser(req)) {
                    if (preparedFilters?.include?.select) {
                        preparedFilters.include.select = await filterHiddenFields(preparedFilters.include.select, req, relatedModelConfig);
                    }
                }
            }
        }
    } else {
        if (!isAdminUser(req) && modelConfig?.hiddenAttributes) {
            preparedFilters.select = modelConfig.hiddenAttributes
                .filter(field => !modelConfig.hiddenAttributes.includes(field))
                .reduce((acc, field) => ({ ...acc, [field]: true }), {});
        }
    }

    return preparedFilters;
};