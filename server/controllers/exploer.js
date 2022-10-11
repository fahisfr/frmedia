const dbPost = require("../dbSchemas/post");
const objectId = require("mongoose").Types.ObjectId;
const { DB_PROJECT_POST_LC } = require("./helper");
const explore = async (req, res, next) => {
  const { publicID } = req.user;
  try {
    const posts = await dbPost.aggregate([
      {
        $match: {},
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
          userInfo: {
            $arrayElemAt: ["$userInfo", 0],
          },
        },
      },
      {
        $project: DB_PROJECT_POST_LC(publicID),
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
