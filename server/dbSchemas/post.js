const mongoose = require("mongoose");

const postSchema = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  content: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  file: {
    type: {
      type: String,
      enum: ["image", "video"],
    },
    name: {
      type: String,
    },
  },
  editAt: { type: Date, default: Date.now },
};

const dbPost = mongoose.model(
  "posts",
  new mongoose.Schema({
    ...postSchema,

    postAt: { type: Date, default: Date.now },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "comments" },
  })
);

module.exports = { dbPost, postSchema };
