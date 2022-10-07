const db = require("mongoose");
const objectId = require("mongoose").Schema.Types.ObjectId;

const user = new db.Schema({
  publicID: {
    type: db.Schema.Types.ObjectId,
    default: db.Schema.Types.ObjectId,
  },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  CreaetAt: { type: Date, default: Date.now },
  posts: [{ type: db.Schema.Types.ObjectId }],
  followers: [{ type: db.Schema.Types.ObjectId }],
  following: [{ type: db.Schema.Types.ObjectId }],
  profilePic: { type: String, default: "default_profile.jpg" },
  coverPic: { type: String, default: "jxz3f3xij.jpeg" },
  bio: { type: String, default: "I am a new user" },
  link: { type: String },
  posts: [{ type: db.Schema.Types.ObjectId }],
  admin: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  refreshToken: { type: String, default: null, select: false },
  notifCount: { type: Number },
  notifications: [
    {
      type: { type: String },
      //pcr full post,comment,reply
      pcr: { type: String },
      userId: { type: db.Schema.Types.ObjectId },
      postId: { type: db.Schema.Types.ObjectId },
      commentId: { type: db.Schema.Types.ObjectId },
      replyId: { type: db.Schema.Types.ObjectId },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Users = db.model("users", user);

module.exports = Users;
