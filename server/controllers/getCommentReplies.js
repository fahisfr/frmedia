const dbPost = require("../dbSchemas/post");
const objectId = require("mongoose").Types.ObjectId;
const { idIn, DB_PROJECT_REPLY_LC } = require("./helper");

const getReplies = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const publicID = req.user?.publicID;
    const result = await dbPost.aggregate([
      {
        $match: {
          _id: objectId(postId),
        },
      },
      {
        $unwind: {
          path: "$comments",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "comments._id": objectId(commentId),
        },
      },
      {
        $unwind: {
          path: "$comments.replies",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $replaceWith: "$comments.replies",
      },
      {
        $addFields: {
          likesCount: { $size: "$likes" },
          liked: idIn(publicID, "$likes"),
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
          userInfo: {
            $arrayElemAt: ["$userInfo", 0],
          },
        },
      },
      { $project: DB_PROJECT_REPLY_LC(publicID) },
    ]);

    console.log(result);

    if (result.length > 0) {
      res.json({ status: "ok", replies: result });
      return;
    }
    res.json({ status: "error", error: "No replies found" });
  } catch (error) {
    next(error);
  }
};

module.exports = getReplies;
