import { Router } from "express";
import authRoutes from "@/endpoints/auth/routes";

const router = Router();

router.use("/auth", authRoutes);
// ... Route definitions for other endpoints

export default router;