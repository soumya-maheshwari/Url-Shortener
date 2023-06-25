const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    longURL: {
      type: String,
      required: true,
    },
    shortID: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
const Url = mongoose.model("url", urlSchema);

module.exports = Url;
