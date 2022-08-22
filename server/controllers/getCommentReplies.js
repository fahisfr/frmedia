const dbPost = require("../dbSchemas/post");
const ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");

const getReplies = async (req, res, next) => {
  try {
    const {postId} =req.params
    const {commentId} = req.body
    const result = await dbPost.aggregate([
      {
        $match: {
          _id: ObjectId(postId),
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
          "comments._id": ObjectId(commentId),
        },
      },
      {
        $unwind: {
          path: "$comments.replies",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          "comments.replies.likesCount": { $size: "$comments.replies.likes" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.replies.userId",
          foreignField: "_id",
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
      {
        $group: {
          _id: null,
          replies: {
            $push: "$comments.replies",
          },
        },
      },
    ]);

    if (result.length > 0) {
      res.json({ status: "ok", replies: result[0].replies });
      return;
    }
    res.json({ status: "error", error: "No replies found" });
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = getReplies;
