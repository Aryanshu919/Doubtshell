"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth_controller");
const authRouter = (0, express_1.Router)();
authRouter.route("/register").post(auth_controller_1.register);
authRouter.route("/login").post(auth_controller_1.login);
exports.default = authRouter;
