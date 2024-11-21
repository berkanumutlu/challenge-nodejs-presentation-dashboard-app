import { JwtPayload } from "jsonwebtoken";
import { User, UserRole } from "@prisma/client";

export type JWTUserType = JwtPayload & {
    id: User,
    role: UserRole
};