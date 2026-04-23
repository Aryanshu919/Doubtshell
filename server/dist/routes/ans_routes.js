"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ans_controller_1 = require("../controllers/ans_controller");
const auth_middleware_1 = require("../middlewares/auth_middleware");
const ansRouter = (0, express_1.Router)();
ansRouter.route("/").post(auth_middleware_1.authMiddleware, ans_controller_1.createAnswerByQuestionId);
exports.default = ansRouter;
