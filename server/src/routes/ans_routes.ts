import { Router } from "express";
import { createAnswerByQuestionId } from "../controllers/ans_controller";
import { authMiddleware } from "../middlewares/auth_middleware";
const ansRouter = Router();

ansRouter.route("/").post(authMiddleware,  createAnswerByQuestionId);

export default ansRouter;