import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@prisma/client";
import { ParameterUserIdType } from "./parameter";

export type JWTUserType = JwtPayload & {
    id: ParameterUserIdType,
    role: UserRole
};