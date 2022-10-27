const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const songSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    publishYear: String,
    overallRating: String,
    ratings: [
      {
        type: Object,
        user_id: String,
        rating: String,
      },
    ],
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    artistName: String,
    coverImage: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
