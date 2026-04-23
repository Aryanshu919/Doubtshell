"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookmark_controller_1 = require("../controllers/bookmark_controller");
const auth_middleware_1 = require("../middlewares/auth_middleware");
const bookmarkRouter = (0, express_1.Router)();
bookmarkRouter.route("/").post(auth_middleware_1.authMiddleware, bookmark_controller_1.bookmarkQuestion);
exports.default = bookmarkRouter;
