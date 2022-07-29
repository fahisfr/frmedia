const db = require("mongoose");

const user = new db.Schema({
  
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  CreaetAt: { type: Date, default: Date.now },
  posts: [{ type: db.Schema.Types.ObjectId, ref: "Post" }],
  followers: [{ type: db.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: db.Schema.Types.ObjectId, ref: "User" }],
  profilePic: { type: String, default: "default-profile.png" },
  coverPic: { type: String, default: "default-avatar.png" },
  bio: { type: String, default: "I am a new user" },
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  refreshToken: { type: String, default: null },
  
});

const Users = db.model("users", user);

module.exports = Users;
