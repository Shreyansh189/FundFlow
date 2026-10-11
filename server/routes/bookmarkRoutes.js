import express from "express";
import {
  createBookmark,
  getBookmarks,
  deleteBookmark,
} from "../controllers/bookmarkController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get(
  "/",
  authMiddleware,
  getBookmarks
);
router.post(
  "/:startupId",
  authMiddleware,
  createBookmark
);
router.delete(
  "/:startupId",
  authMiddleware,
  deleteBookmark
);
export default router;