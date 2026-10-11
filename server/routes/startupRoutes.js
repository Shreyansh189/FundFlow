import express from "express";
import {
  createStartup,
  getStartups,
  getStartupById,
  updateStartup,
  deleteStartup,
} from "../controllers/startupController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles("founder"),
  createStartup
);

router.get("/", getStartups);
router.get("/:id", getStartupById);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("founder"),
  updateStartup
);
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("founder"),
  deleteStartup
);
export default router;