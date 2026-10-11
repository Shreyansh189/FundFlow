import express from "express";
import { generateStartupPitch } from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/startup-summary/:startupId",
  authMiddleware,
  generateStartupPitch
);

export default router;