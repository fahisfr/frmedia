const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const user = new mongoose.Schema({
  publicID: {
    type: objectId,
    default: mongoose.Types.ObjectId(),
  },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  CreaetAt: { type: Date, default: Date.now },
  posts: [{ type: objectId }],
  followers: [{ type: objectId }],
  following: [{ type: objectId }],
  profilePic: { type: String, default: "default_profile.jpeg" },
  coverPic: { type: String, default: "jxz3f3xij.jpeg" },
  bio: { type: String, default: "I am a new user" },
  signWith: String,
  link: String,
  posts: [{ type: objectId }],
  admin: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  refreshToken: { type: String, default: null, select: false },
  notifCount: { type: Number },
  notifications: [
    {
      type: { type: String },
      //pcr full post,comment,reply
      pcr: { type: String },
      userId: { type: objectId },
      postId: { type: objectId },
      commentId: { type: objectId },
      replyId: { type: objectId },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Users = mongoose.model("users", user);

module.exports = Users;
