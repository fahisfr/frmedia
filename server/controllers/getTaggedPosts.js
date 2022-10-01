const dbPost = require("../dbSchemas/post");
const objectId = require("mongoose").Types.ObjectId;
const { idIn } = require("./helper");

const hashTags = async (req, res, next) => {
  try {
    const { tage } = req.params;
    const publicID = req.user?.publicID;
    const posts = await dbPost.aggregate([
      {
        $match: {
          hashTags: { $in: [tage] },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "publicID",
          as: "userInfo",
        },
      },
      {
        $set: {
          userInfo: { $arrayElemAt: ["$userInfo", 0] },
        },
      },
      {
        $project: {
          _id: 1,
          text: 1,
          file: 1,
          postAt: 1,
          commentsCount: 1,
          postAt: 1,
          likesCount: { $size: "$likes" },
          comments: { $size: "$comments" },
          tage: tage,
          liked: idIn(publicID, "$likes"),
          userInfo: {
            userName: 1,
            profilePic: 1,
            coverPic: 1,
            isVerified: 1,
          },
        },
      },
    ]);

    if (posts.length > 0) {
      res.json({ status: "ok", posts });

      return;
    }
    res.json({ status: "error", error: `Resutl not found` });
  } catch (error) {
    next(error);
  }
};

module.exports = hashTags;
