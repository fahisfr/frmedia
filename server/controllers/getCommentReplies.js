const dbPost = require("../dbSchemas/post");
const objectId = require("mongoose").Types.ObjectId;

const getReplies = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { id } = req.user;
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
        $addFields: {
          comments: {
            replies: {
              likesCount: { $size: "$comments.replies.likes" },
              liked: {
                $cond: [
                  { $ifNull: [id, true] },
                  { $in: [objectId(id), "$comments.replies.likes"] },
                  false,
                ],
              },
            },
          },
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
    next(error);
  }
};

module.exports = getReplies;
