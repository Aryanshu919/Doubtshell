"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ques_controller_1 = require("../controllers/ques_controller");
const auth_middleware_1 = require("../middlewares/auth_middleware");
const quesRouter = (0, express_1.Router)();
quesRouter.route("/").post(auth_middleware_1.authMiddleware, ques_controller_1.createQuestion).get(auth_middleware_1.authMiddleware, ques_controller_1.getQuestions);
quesRouter.route("/:id").delete(auth_middleware_1.authMiddleware, ques_controller_1.deleteQuestionById).get(auth_middleware_1.authMiddleware, ques_controller_1.getQuestionsById);
exports.default = quesRouter;
