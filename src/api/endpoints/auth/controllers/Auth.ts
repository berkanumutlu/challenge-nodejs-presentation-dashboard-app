import { UserRole } from "@prisma/client";
import { Request, Response, Next, AuthenticatedRequest } from "@/types/request";
import { UserModelConfig } from "@/types/model";
import { compareBcryptText } from "@/utils/text";
import { createToken, verifyToken } from "@/utils/auth";
import { filterGuardedFields, filterHiddenFields } from "@/utils/model";
import * as UserService from "../services/User";

export const register = async (req: Request, res: Response, next: Next) => {
    try {
        let requestData = req.body;

        requestData.role = UserRole.USER;
        requestData = await filterGuardedFields(requestData, req, UserModelConfig);

        const newRecord = await UserService.create(requestData);
        const responseData = await filterHiddenFields(newRecord, req, UserModelConfig);

        return res.success(responseData, 'You have successfully registered.', 201);
    } catch (err) {
        next(err);
    }
};
export const login = async (req: Request, res: Response, next: Next) => {
    try {
        const { username, password } = req.body;

        const record = await UserService.getActive({
            where: { email: username },
            select: { id: true, password: true, role: true }
        });
        if (!record) return res.warning('User not found.', 404);

        const isPaswordCorrect = await compareBcryptText(password, record.password);
        if (!isPaswordCorrect) return res.warning('Username or password is incorrect.', 401);

        const userToken = createToken({ id: record.id, role: record.role });
        const responseData = { token: userToken };

        return res.success(responseData, 'You have successfully logged in.', 200);
    } catch (err) {
        next(err);
    }
};
export const logout = async (req: Request, res: Response, next: Next) => {
    try {
        // TODO: Since the token is not kept in a table, no transactions are made at this time.
        return res.success(null, 'You have successfully logged out.', 200);
    } catch (err) {
        next(err);
    }
};
export const me = async (req: AuthenticatedRequest, res: Response, next: Next) => {
    try {
        const decoded = verifyToken(req.token);
        if (!decoded) return res.warning('Invalid token.', 403);

        const user = await UserService.getActive({ where: { id: (decoded as any).id } });
        if (!user) return res.warning('User not found.', 404);
        if (user.status !== true) return res.warning('Access denied.', 403);

        const responseData = await filterHiddenFields(user, req, UserModelConfig, null, ['id', 'status']);

        return res.success(responseData);
    } catch (err) {
        next(err);
    }
};