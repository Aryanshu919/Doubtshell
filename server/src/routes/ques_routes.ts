import { Router } from "express";
import { createQuestion, getQuestions, deleteQuestionById, getQuestionsById } from "../controllers/ques_controller";
import { authMiddleware } from "../middlewares/auth_middleware";

const quesRouter = Router();

quesRouter.route("/").post(authMiddleware, createQuestion).get(authMiddleware,getQuestions);
quesRouter.route("/:id").delete(authMiddleware, deleteQuestionById).get(authMiddleware,getQuestionsById);

export default quesRouter;