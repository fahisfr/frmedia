const dbPost = require("../dbSchemas/post");
const objectId = require("mongoose").Types.ObjectId;
const { idIn, DB_PROJECT_USERiNFO } = require("./helper");

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
        $project: {
          _id: "$comments._id",
          text: "$comments.text",
          file: "$comments.file",
          commentAt: "$comments.commentAt",
          replies: "$comments.replies",
          userInfo: "$comments.userInfo",
          liked: idIn(publicID, "$comments.likes"),
          likesCount: { $size: "$comments.likes" },
          repliesCount: { $size: "$comments.replies" },
        },
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
          _id: 1,
          userId: 1,
          text: 1,
          file: 1,
          commentAt: 1,
          userInfo: DB_PROJECT_USERiNFO,
          liked: 1,
          likesCount: 1,
          repliesCount: 1,
          replies: {
            _id: 1,
            userId: 1,
            text: 1,
            file: 1,
            replyAt: 1,
            liked: idIn(publicID, "$replies.likes"),
            likesCount: { $size: "$replies.likes" },
            userInfo: DB_PROJECT_USERiNFO,
          },
        },
      },
    ]);

    if (dbResult.length > 0) {
      return res.json({ status: "ok", info: dbResult[0] });
    }

    res.json({ status: "error", error: "comment not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = getComment;
