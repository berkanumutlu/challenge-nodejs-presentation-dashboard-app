import { UserModelConfig } from "@/types/models";
import { encryptFields } from "@/utils/text";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const list = async (filters?: Prisma.UserFindManyArgs) => {
    return prisma.user.findMany(filters);
};
export const count = async (filters?: Prisma.UserFindManyArgs) => {
    const { where, orderBy, cursor, take, skip } = filters || {};
    return prisma.user.count({ where, orderBy, cursor, take, skip });
};
export const get = async (filters?: Prisma.UserFindUniqueArgs) => {
    if (!filters || !filters.where) {
        throw new Error("A valid `where` condition is required to find a unique user.");
    }
    return prisma.user.findUnique(filters);
};
export const create = async (data: Prisma.UserCreateInput) => {
    const encryptedData = await encryptFields(data, UserModelConfig.encryptAttributes) as Prisma.UserCreateInput;
    return await prisma.user.create({ data: encryptedData });
};