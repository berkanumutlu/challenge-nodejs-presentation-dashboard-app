import { PrismaClient, Prisma } from "@prisma/client";
import { UserModelConfig } from "@/types/models";
import { encryptFields } from "@/utils/text";

const prisma = new PrismaClient();

export const list = async (filters?: Prisma.UserFindManyArgs) => {
    return prisma.user.findMany(filters);
};
export const listActive = (filters?: Prisma.UserFindManyArgs) => {
    return list({
        ...filters,
        where: {
            ...filters?.where,
            deletedAt: null
        }
    });
};
export const count = async (filters?: Prisma.UserFindManyArgs) => {
    const { where, orderBy, cursor, take, skip } = filters || {};
    return prisma.user.count({ where, orderBy, cursor, take, skip });
};
export const countActive = async (filters?: Prisma.UserFindManyArgs) => {
    return count({
        ...filters,
        where: {
            ...filters?.where,
            deletedAt: null
        }
    });
};
export const get = async (filters?: Prisma.UserFindUniqueArgs) => {
    if (!filters || !filters.where) {
        throw new Error("A valid `where` condition is required to find a unique user.");
    }
    return prisma.user.findUnique(filters);
};
export const getActive = (filters?: Prisma.UserFindUniqueArgs) => {
    return get({
        ...filters,
        where: {
            ...filters?.where,
            deletedAt: null
        }
    });
};
export const create = async (data: Prisma.UserCreateInput) => {
    const encryptedData = await encryptFields(data, UserModelConfig.encryptAttributes) as Prisma.UserCreateInput;
    return await prisma.user.create({ data: encryptedData });
};
export const update = (filters: Prisma.UserWhereUniqueInput, fields: Prisma.UserUpdateInput) => {
    return prisma.user.update({
        where: filters,
        data: fields
    });
};
export const deleteRecord = (id: Prisma.UserWhereUniqueInput) => {
    return prisma.user.delete({ where: id });
};
export const restore = async (id: Prisma.UserWhereUniqueInput) => {
    return prisma.user.update({
        where: id,
        data: {
            deletedAt: null
        }
    });
};