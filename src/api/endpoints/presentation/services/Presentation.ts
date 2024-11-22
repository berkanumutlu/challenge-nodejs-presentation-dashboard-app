import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const list = (filters?: Prisma.PresentationFindManyArgs) => {
    return prisma.presentation.findMany(filters);
};
export const listActive = (filters?: Prisma.PresentationFindManyArgs) => {
    return list({
        ...filters,
        where: {
            ...filters?.where,
            deletedAt: null
        }
    });
};
export const count = async (filters?: Prisma.PresentationFindManyArgs) => {
    const { where, orderBy, cursor, take, skip } = filters || {};
    return prisma.presentation.count({ where, orderBy, cursor, take, skip });
};
export const countActive = async (filters?: Prisma.PresentationFindManyArgs) => {
    return count({
        ...filters,
        where: {
            ...filters?.where,
            deletedAt: null
        }
    });
};
export const get = async (filters?: Prisma.PresentationFindUniqueArgs) => {
    if (!filters || !filters.where) {
        console.error("A valid `where` condition is required to find a unique presentation.");
        return null;
    }
    try {
        return await prisma.presentation.findUnique(filters);
    } catch (error) {
        console.error("Presentation find error:", error);
        return null;
    }
};
export const getActive = (filters?: Prisma.PresentationFindUniqueArgs) => {
    return get({
        ...filters,
        where: {
            ...filters?.where,
            deletedAt: null
        }
    });
};
export const create = (data: Prisma.PresentationCreateInput) => {
    return prisma.presentation.create({ data });
};
export const update = async (filters: Prisma.PresentationWhereUniqueInput, fields: Prisma.PresentationUpdateInput) => {
    return prisma.presentation.update({
        where: filters,
        data: fields
    });
};
export const deleteRecord = (id: Prisma.PresentationWhereUniqueInput) => {
    return prisma.presentation.delete({ where: id });
};
export const softDeleteRecord = (id: Prisma.PresentationWhereUniqueInput) => {
    return prisma.presentation.update({ where: id, data: { deletedAt: new Date() } });
};
export const restore = async (id: Prisma.PresentationWhereUniqueInput) => {
    return prisma.presentation.update({ where: id, data: { deletedAt: null } });
};