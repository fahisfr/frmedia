
const dbPost = require("../dbSchemas/post");
const objectId = require("mongoose").Types.ObjectId;
const {  idIn } = require("./helper");

const getCommentAndReply = async (req, res, next) => {
  try {
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
        $unwind: "$comments.replies",
      },
      {
        $match: {
          "comments.replies._id": objectId(replyId),
        },
      },
      {
        $lookup: {
          from: "users",
          foreignField: "publicID",
          localField: "comments.replies.userId",
          as: "comments.replies.userInfo",
        },
      },
      {
        $set: {
          "comments.replies.userInfo": {
            $arrayElemAt: ["$comments.replies.userInfo", 0],
          },
        },
      },
    ]);

   
    if (dbResult.length > 0) {
      return res.json({ status: "ok", info: dbResult[0].comments });
    }
    res.json({ status: "error", error: "reply not found" });
  } catch (error) {
    next(error);
  }
};

const getPostAndComment = async (req, res, next) => {
  try {
    const publicID = req.user?.publicID;
    const { postId, commentId } = req.params;

    const dbResult = await dbPost.aggregate([
      {
        $match: {
          _id: objectId(postId),
        },
      },
      {
        $lookup: {
          from: "users",
          foreignField: "publicID",
          localField: "userId",
          as: "userInfo",
        },
      },
      {
        $set: {
          userInfo: {
            $arrayElemAt: ["$userInfo", 0],
          },
          commentsCount: { $size: "$comments" },
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
          _id: 1,
          userId: 1,
          userInfo: projectUserInfo(),
          text: 1,
          file: 1,
          postAt: 1,
          likesCount: 1,
          liked: idIn(publicID, "$likes"),
          comments: {
            _id: 1,
            userId: 1,
            text: 1,
            file: 1,
            commentAt: 1,
            userInfo: projectUserInfo(),
            liked: idIn(publicID, "$comments.likes"),
            likesCount: { $size: "$comments.likes" },
            repliesCount: { $size: "$comments.replies" },
          },
        },
      },
    ]);
    console.log(dbResult[0]);
    if (dbResult.length > 0) {
      return res.json({ status: "ok", info: dbResult[0] });
    }
    res.json({ status: "error", error: "comment not found" });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const publicID = req.user.publicID;
    const { postId } = req.params;
    const dbResult = await dbPost.aggregate([
      {
        $match: {
          _id: objectId(postId),
        },
      },
      {
        $lookup: {
          from: "users",
          foreignField: "publicID",
          localField: "userId",
          as: "useInfo",
        },
      },
      {
        $set: {
          userInfo: {
            $arrayElemAt: ["$useInfo", 0],
          },
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          text: 1,
          file: 1,
          likesCount: { $size: "$likes" },
          commentsCount: { $size: "$comments" },
          liked: idIn(publicID, "$likes"),
          postAt: 1,
          userInfo: projectUserInfo,
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

module.exports = {
  getPostAndComment,
  getCommentAndReply,
  getPost,
};
