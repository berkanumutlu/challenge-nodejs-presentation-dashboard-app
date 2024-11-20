import { JwtPayload, verify, sign } from "jsonwebtoken";
import { UserRole } from "@prisma/client";
import { Request } from "@/types/request";
import { jwtConfig } from "@/config";

export const createToken = (payload: JwtPayload | string): string => {
    return sign(payload, jwtConfig.secretKey, { expiresIn: jwtConfig.expiresIn });
};
export const verifyToken = (payload: JwtPayload | string) => {
    try {
        return verify(payload as string, jwtConfig.secretKey);
    } catch (err) {
        return false;
    }
};
export const checkUserRole = (req: Request, role: UserRole) => {
    return req?.user && req?.user?.role === role;
};
export const isSuperUser = (req: Request): boolean => {
    return checkUserRole(req, UserRole.SUPER);
};
export const isAdminUser = (req: Request): boolean => {
    return checkUserRole(req, UserRole.ADMIN);
};
export const isUser = (req: Request): boolean => {
    return checkUserRole(req, UserRole.USER);
};