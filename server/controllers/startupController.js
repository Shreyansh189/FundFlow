import Startup from "../models/Startup.js";

export const createStartup = async (req, res) => {
  try {
    const {
      name,
      tagline,
      industry,
      description,
      fundingRequired,
      website,
      location,
    } = req.body;

    if (!name || !industry || !description || fundingRequired === undefined) {
      return res.status(400).json({
        message: "Name, industry, description and funding are required",
      });
    }

    const startup = await Startup.create({
      name,
      tagline,
      industry,
      description,
      fundingRequired,
      website,
      location,
      founder: req.user.userId,
    });

    res.status(201).json({
      message: "Startup created successfully",
      startup,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const getStartups = async (req, res) => {
  try {
    const { search, industry } = req.query;

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit) || 10, 1),
      50
    );

    const skip = (page - 1) * limit;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { tagline: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (industry) {
      filter.industry = {
        $regex: `^${industry}$`,
        $options: "i",
      };
    }

    const [startups, total] = await Promise.all([
      Startup.find(filter)
        .populate("founder", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Startup.countDocuments(filter),
    ]);

    res.status(200).json({
      startups,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const getStartupById = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id)
      .populate("founder", "name email");

    if (!startup) {
      return res.status(404).json({
        message: "Startup not found",
      });
    }

    res.status(200).json({
      startup,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const updateStartup = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);

    if (!startup) {
      return res.status(404).json({
        message: "Startup not found",
      });
    }

    // Ownership check
    if (startup.founder.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only update your own startup",
      });
    }

    const {
      name,
      tagline,
      industry,
      description,
      fundingRequired,
      website,
      location,
    } = req.body;

    startup.name = name ?? startup.name;
    startup.tagline = tagline ?? startup.tagline;
    startup.industry = industry ?? startup.industry;
    startup.description = description ?? startup.description;
    startup.fundingRequired =
      fundingRequired ?? startup.fundingRequired;
    startup.website = website ?? startup.website;
    startup.location = location ?? startup.location;

    await startup.save();

    res.status(200).json({
      message: "Startup updated successfully",
      startup,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const deleteStartup = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);

    if (!startup) {
      return res.status(404).json({
        message: "Startup not found",
      });
    }

    // Ownership check
    if (startup.founder.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only delete your own startup",
      });
    }

    await startup.deleteOne();

    res.status(200).json({
      message: "Startup deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};