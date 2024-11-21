import { Router } from "express";
import authRoutes from "@/endpoints/auth/routes";
import presentationRoutes from "@/endpoints/presentation/routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/presentation", presentationRoutes);
// ... Route definitions for other endpoints

export default router;