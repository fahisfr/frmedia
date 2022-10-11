const dbPost = require("../dbSchemas/post");
const { DB_PROJECT_POST, DB_PROJECT_POST_LC } = require("./helper");

const hashTags = async (req, res, next) => {
  const publicID =req.user?.publicID
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
          ...DB_PROJECT_POST_LC(publicID),
          tage: tage,
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
