import { Router } from "express";
import { authToken, authUser } from "@/middlewares/auth";
import * as PresentationController from "../controllers/Presentation";

const presentationRouter = Router();

presentationRouter.use(authToken, authUser);
presentationRouter.post("/list", PresentationController.list);
presentationRouter.post("/get", PresentationController.get);
presentationRouter.post("/create", PresentationController.create);
presentationRouter.put("/update", PresentationController.update);
presentationRouter.delete("/delete", PresentationController.deleteRecord);
presentationRouter.patch("/restore", PresentationController.restore);

export default presentationRouter;