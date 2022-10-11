const objectId = require("mongoose").Types.ObjectId;
const dbPost = require("../dbSchemas/post");
const { idIn, DB_PROJECT_COMMENT_LC } = require("./helper");

const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const publicID = req.user?.publicID;

    const comments = await dbPost.aggregate([
      {
        $match: {
          _id: objectId(postId),
        },
      },
      {
        $project: {
          comments: 1,
        },
      },
      {
        $unwind: {
          path: "$comments",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $replaceWith: "$comments",
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
        $project: DB_PROJECT_COMMENT_LC(publicID),
      },
    ]);

    if (comments.length > 0) {
      return res.json({ status: "ok", comments });
    }
    res.json({ status: "error", error: "No comments" });
  } catch (error) {
    next(error);
  }
};

module.exports = getComments;
