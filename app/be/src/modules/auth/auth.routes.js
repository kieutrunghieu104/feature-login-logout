import { Router } from "express";
import validationRequest from "../../middlewares/validateRequest.js";
import { loginSchema } from "./auth.validation.js";
import {
  loginController,
  logoutController,
  refreshTokenController,
} from "../auth/auth.controller.js";

const router = Router();

router.post("/login", validationRequest(loginSchema), loginController);
router.post("/logout", logoutController);
router.post("/refresh-token", refreshTokenController);

export default router;