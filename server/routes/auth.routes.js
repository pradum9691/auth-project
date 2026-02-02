import express from "express";
import {
  registerController,
  verifyEmailController,
  loginController,
  profileController,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerController);
router.get("/verify/:token", verifyEmailController);
router.post("/login", loginController);
router.get("/profile", authMiddleware, profileController);

export default router;
