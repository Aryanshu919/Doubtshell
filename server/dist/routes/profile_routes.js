"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth_middleware");
const profile_controller_1 = require("../controllers/profile_controller");
const profileRouter = (0, express_1.Router)();
profileRouter.route("/").get(auth_middleware_1.authMiddleware, profile_controller_1.getProfile);
exports.default = profileRouter;
