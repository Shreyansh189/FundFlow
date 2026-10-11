import mongoose from "mongoose";

const startupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    tagline: {
      type: String,
      trim: true,
    },

    industry: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    fundingRequired: {
      type: Number,
      required: true,
      min: 0,
    },

    website: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    founder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Startup = mongoose.model("Startup", startupSchema);

export default Startup;