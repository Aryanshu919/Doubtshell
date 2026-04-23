import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { getProfile } from "../controllers/profile_controller";

const profileRouter = Router();
profileRouter.route("/").get(authMiddleware,getProfile);

export default profileRouter;