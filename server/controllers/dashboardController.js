import Startup from "../models/Startup.js";
import Bookmark from "../models/Bookmark.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [myStartups, bookmarks] = await Promise.all([
      Startup.find({ founder: userId })
        .sort({ createdAt: -1 }),

      Bookmark.find({ user: userId })
        .populate("startup")
        .sort({ createdAt: -1 }),
    ]);

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      stats: {
        myStartups: myStartups.length,
        savedStartups: bookmarks.length,
      },
      myStartups,
      savedStartups: bookmarks
        .filter((bookmark) => bookmark.startup)
        .map((bookmark) => bookmark.startup),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};