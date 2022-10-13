const dbPost = require("../dbSchemas/post");
const objectId = require("mongoose").Types.ObjectId;
const {
  DB_PROJECT_POST_LC,
  DB_PROJECT_REPLY_LC,
  DB_PROJECT_COMMENT,
} = require("./helper");

const getComment = async (req, res, next) => {
  try {
    const publicID = req.user?.publicID;
    const { postId, commentId, replyId } = req.params;
    const dbResult = await dbPost.aggregate([
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
        $unwind: "$comments",
      },
      {
        $match: {
          "comments._id": objectId(commentId),
        },
      },
      {
        $lookup: {
          from: "users",
          foreignField: "publicID",
          localField: "comments.userId",
          as: "comments.userInfo",
        },
      },
      {
        $set: {
          "comments.userInfo": {
            $arrayElemAt: ["$comments.userInfo", 0],
          },
        },
      },
      {
        $replaceWith: "$comments",
      },
      {
        $project: DB_PROJECT_POST_LC(publicID),
      },
      {
        $unwind: {
          path: "$replies",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "replies._id": objectId(replyId),
        },
      },
      {
        $lookup: {
          from: "users",
          foreignField: "publicID",
          localField: "replies.userId",
          as: "replies.userInfo",
        },
      },
      {
        $set: {
          "replies.userInfo": {
            $arrayElemAt: ["$replies.userInfo", 0],
          },
        },
      },
      {
        $project: {
          ...DB_PROJECT_POST_LC,
          replies: DB_PROJECT_REPLY_LC(publicID),
        },
      },
    ]);
    console.log(dbResult);
    if (dbResult.length > 0) {
      return res.json({ status: "ok", info: dbResult[0] });
    }

    res.json({ status: "error", error: "comment not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = getComment;
