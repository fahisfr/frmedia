const mongoose = require("mongoose");

const { postSchema } = require("./post");

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  comments: [
    {
      ...postSchema,
      commentAt: { type: Date, default: Date.now },
      reply: [{ ...postSchema, replyAt: { type: Date, default: Date.now } }],
    },
  ],
});

module.exports = mongoose.model("comments", commentSchema);