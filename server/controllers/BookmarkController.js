import Bookmark from "../models/Bookmark.js";
import Startup from "../models/Startup.js";

export const createBookmark = async (req, res) => {
  try {
    const { startupId } = req.params;

    // Check whether startup exists
    const startup = await Startup.findById(startupId);

    if (!startup) {
      return res.status(404).json({
        message: "Startup not found",
      });
    }

    // Prevent duplicate bookmark
    const existingBookmark = await Bookmark.findOne({
      user: req.user.userId,
      startup: startupId,
    });

    if (existingBookmark) {
      return res.status(409).json({
        message: "Startup already bookmarked",
      });
    }

    const bookmark = await Bookmark.create({
      user: req.user.userId,
      startup: startupId,
    });

    res.status(201).json({
      message: "Startup bookmarked successfully",
      bookmark,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      user: req.user.userId,
    })
      .populate({
        path: "startup",
        populate: {
          path: "founder",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: bookmarks.length,
      bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const deleteBookmark = async (req, res) => {
  try {
    const { startupId } = req.params;

    const bookmark = await Bookmark.findOneAndDelete({
      user: req.user.userId,
      startup: startupId,
    });

    if (!bookmark) {
      return res.status(404).json({
        message: "Bookmark not found",
      });
    }

    res.status(200).json({
      message: "Bookmark removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};