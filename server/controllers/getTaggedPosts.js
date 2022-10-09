const dbPost = require("../dbSchemas/post");
const { DB_PROJECT_USERINFO } = require("./helper");

const hashTags = async (req, res, next) => {
  try {
    const { tage } = req.params;
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
          userInfo: DB_PROJECT_USERINFO,
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
