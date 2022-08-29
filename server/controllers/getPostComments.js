const objectId = require("mongoose").Types.ObjectId;
const dbPost = require("../dbSchemas/post");

const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { id } = req.user;

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
        $lookup: {
          from: "users",
          localField: "comments.userId",
          foreignField: "_id",
          as: "comments.userInfo",
        },
      },

      {
        $addFields: {
          comments: {
            liked: {
              $cond: [
                { $ifNull: [id, true] },
                { $in: [objectId(id), "$comments.likes"] },
                false,
              ],
            },
            likesCount: { $size: "$comments.likes" },
            repliesCount: { $size: "$comments.replies" },
            userInfo: { $arrayElemAt: ["$comments.userInfo", 0] },
          },
        },
      },
      {
        $unset: ["comments.replies"],
      },
      {
        $group: {
          _id: "$_id",
          comments: { $push: "$comments" },
        },
      },
    ]);

    if (comments.length > 0) {
      return res.json({ status: "ok", comments: comments[0] });
    }
    res.json({ status: "error", error: "no comments" });
  } catch (error) {
    next(error);
  }
};

module.exports = getComments;
