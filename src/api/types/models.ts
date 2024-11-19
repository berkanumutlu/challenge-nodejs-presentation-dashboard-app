export enum UserRole {
    SUPER = "SUPER",
    ADMIN = "ADMIN",
    USER = "USER"
};
export interface UserModelType {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: string | null;
    role: UserRole;
    status: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    presentations?: PresentationModelType[];
};
export interface PresentationModelType {
    id: string;
    name: string;
    image: string | null;
    userId: string;
    User?: UserModelType;
    status: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
