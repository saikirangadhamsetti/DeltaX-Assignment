const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const SongsSchema = new mongoose.Schema({ songid: String });

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  Dob: {
    required: true,
    type: String,
  },
  songs: [
    {
      type: Object,
      name: String,
      publishYear: String,
      ref: "Song",
    },
  ],
});

module.exports = mongoose.model("Artist", dataSchema);
