const db = require("mongoose");
const objectId = require("mongoose").Schema.Types.ObjectId;

const user = new db.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  CreaetAt: { type: Date, default: Date.now },
  posts: [{ type: db.Schema.Types.ObjectId, ref: "Post" }],
  followers: [{ type: db.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: db.Schema.Types.ObjectId, ref: "User" }],
  profilePic: { type: String, default: "default-profile.png" },
  coverPic: { type: String, default: "default-avatar.png" },
  bio: { type: String, default: "I am a new user" },
  link: { type: String },
  posts: [{ type: db.Schema.Types.ObjectId, ref: "posts" }],
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  refreshToken: { type: String, default: null, select: false },
  notifCount: { type: Number },
  notifications: [{
      type: { type: String },
      postId: { type: db.Schema.Types.ObjectId },
      userId: { type: db.Schema.Types.ObjectId },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Users = db.model("users", user);

module.exports = Users;
