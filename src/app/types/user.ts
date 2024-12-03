export type UserItemType = {
    id: number | string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string | null;
    role?: string;
    status?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string | null;
    deletedAt?: Date | string | null;
}