import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: [true, "Please provide url."],
      trim: true,
    },
    shortUrl: {
      type: String,
      required: [true, "Please provide short url."],
    },
    urlId: {
      type: String,
      required: [true, "Please provide url id."],
    },
    clicks: {
      type: Number,
      min: 0,
      default: 0,
      required: [true, "Please provide number of clicks."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("url", UrlSchema);
