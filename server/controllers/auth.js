const dbUser = require("../dbSchemas/user");
const mongoose = require("mongoose");

const auth = async (req, res, next) => {
  try {
    const userInfo = await dbUser.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $addFields: {
          followersCount: { $size: "$followers" },
          followingCount: { $size: "$following" },
        },
      },
      {
        $project: {
          _id: 1,
          userName: 1,
          email: 1,
          bio: 1,
          profilePic: 1,
          avatarPic: 1,
          link: 1,
          followersCount: 1,
          followingCount: 1,
          notifCount: 1,
        },
      },
    ]);


    if (userInfo) {
      res.json({
        status: "ok",
        userInfo: userInfo[0],
      });
      return;
    }
    res.json({
      status: "error",
      error: "user not found",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
