const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  file: {
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  comments: [
    {
      owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: { type: String, required: true },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      commentAt: { type: Date, default: Date.now },
      editAt: { type: Date, default: Date.now },
    },
  ],
  postAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("posts", PostSchema);
