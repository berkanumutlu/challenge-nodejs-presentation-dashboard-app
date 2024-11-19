import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello world!");
});
// ... Route definitions for other endpoints

export default router;