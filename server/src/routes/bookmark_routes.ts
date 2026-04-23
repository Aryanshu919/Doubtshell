import { Router } from "express";

import { bookmarkQuestion } from "../controllers/bookmark_controller";
import { authMiddleware } from "../middlewares/auth_middleware";

const bookmarkRouter = Router();

bookmarkRouter.route("/").post(authMiddleware, bookmarkQuestion);

export default bookmarkRouter;