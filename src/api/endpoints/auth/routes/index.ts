import { Router } from "express";
import { authToken } from "@/middlewares/auth";
import * as AuthController from "../controllers/Auth";

const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.post('/logout', authToken as any, AuthController.logout);
authRouter.post('/me', authToken as any, AuthController.me);

export default authRouter;