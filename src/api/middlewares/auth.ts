import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { Request, Response, Next } from "@/types/request";
import { AuthenticatedRequest } from "@/types/request";
import { jwtConfig } from "@/config";
import { isAdminUser, isSuperUser, isUser } from "@/utils/auth";

const prisma = new PrismaClient();

export const authToken = async (req: Request, res: Response, next: Next): Promise<void> => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.warning('Access denied. No token provided.', 403);

    try {
        jwt.verify(token, jwtConfig.secretKey, async (err, decoded) => {
            if (err) return res.warning('Invalid token.', 403);

            const userId = (decoded as any).id;
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { id: true, firstName: true, lastName: true, email: true, status: true, role: true }
            });
            if (!user) return res.warning('User not found.', 404);
            if (user.status !== true) return res.warning('Access denied.', 403);

            (req as any).user = user as User;
            (req as any).token = token as string
                ;
            next();
        });
    } catch (err) {
        next(err);
    }
};
export const authSuper = (req: AuthenticatedRequest, res: Response, next: Next): void => {
    if (req?.user && isSuperUser(req)) {
        next();
    } else {
        return res.warning('You are not authorized.', 403);
    }
};
export const authAdmin = (req: AuthenticatedRequest, res: Response, next: Next): void => {
    if (req?.user && (isSuperUser(req) || isAdminUser(req))) {
        next();
    } else {
        return res.warning('You are not authorized.', 403);
    }
};
export const authUser = (req: AuthenticatedRequest, res: Response, next: Next): void => {
    if (req?.user && (isSuperUser(req) || isAdminUser(req) || isUser(req))) {
        next();
    } else {
        return res.warning('You are not authorized.', 403);
    }
};
