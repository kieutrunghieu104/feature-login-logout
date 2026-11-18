import { Router } from "express";

import { getUserByIdController } from "./dashboard.controller.js";

import authenticate from "../../middlewares/authenticate.js";

const router = Router();
router
  .route("/me")
  .get(authenticate, getUserByIdController);

export default router;