const dbPost = require("../dbSchemas/post");
const objectId = require("mongoose").Types.ObjectId;
const explore = async (req, res, next) => {
  try {
    const posts = await dbPost.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },

      {
        $set: {
          userInfo: {
            $arrayElemAt: ["$userInfo", 0],
          },
        },
      },
      {
        $project: {
          userInfo: {
            _id: "$userInfo._id",
            userName: "$userInfo.userName",
            profilePic: "$userInfo.profilePic",
            coverPic: "$userInfo.coverPic",
            bio: "$userInfo.bio",
            isVerified: "$userInfo.isVerified",
          },
          likesCount: {
            $size: "$likes",
          },
          commentsCount: {
            $size: "$comments",
          },
          liked: {
            $in: [objectId("62ff6f5c4cfc303b76427cb6"), "$likes"],
          },
          _id: 1,
          text: 1,
          file: 1,
          postAt: 1,
          page: "explore",
        },
      },
      {
        $sort: {
          likes: -1,
          comments: -1,
        },
      },
    ]);
    if (posts.length > 0) {
      res.json({ status: "ok", posts });
      return;
    }
    res.json({ status: "error", error: "" });
  } catch (err) {
    next(err);
  }
};

module.exports = explore;
