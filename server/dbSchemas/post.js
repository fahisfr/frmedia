const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const postSchema = {
  userId: {
    type: objectId,
    ref: "users",
    required: true,
  },
  text: { type: String },
  likes: [{ type: objectId, ref: "users" }],
  file: {
    type: {
      type: String,
      enum: ["image", "video"],
    },
    name: String,
    url: String,
  },
  editAt: { type: Date, default: Date.now },
};

const dbPost = mongoose.model(
  "posts",
  new mongoose.Schema({
    ...postSchema,
    postAt: { type: Date, default: Date.now },
    hashTags: [],
    comments: [
      {
        ...postSchema,
        commentAt: { type: Date, default: Date.now },
        replies: [{ ...postSchema, replyAt: { type: Date, default: Date.now } }],
      },
    ],
  })
);

module.exports = dbPost;
