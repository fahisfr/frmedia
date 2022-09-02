const { number } = require("joi");
const mongoose = require("mongoose");

const postSchema = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  text: { type: String },
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
    hashTags: [],
    mentions: [],
    postAt: { type: Date, default: Date.now },
    comments: [
      {
        ...postSchema,
        commentAt: { type: Date, default: Date.now },
        replies: [
          { ...postSchema, replyAt: { type: Date, default: Date.now } },
        ],
      },
    ],
  })
);

module.exports = dbPost;
