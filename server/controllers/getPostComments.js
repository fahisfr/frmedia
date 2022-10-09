const objectId = require("mongoose").Types.ObjectId;
const dbPost = require("../dbSchemas/post");
const { idIn, DB_PROJECT_USERiNFO } = require("./helper");

const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { publicID } = req.user;
    console.log("yes");
    const getComments = await dbPost.aggregate([
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
          foreignField: "publicID",
          as: "comments.userInfo",
        },
      },
      {
        $set: {
          "comments.userInfo": { $arrayElemAt: ["$comments.userInfo", 0] },
        },
      },
      {
        $project: {
          comments: {
            _id: 1,
            text: 1,
            file: 1,
            commentAt: 1,
            userInfo: DB_PROJECT_USERiNFO,
            liked: idIn(publicID, "$comments.likes"),
            likesCount: { $size: "$comments.likes" },
            repliesCount: { $size: "$comments.replies" },
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          comments: { $push: "$comments" },
        },
      },
    ]);

    if (getComments.length > 0) {
      return res.json({ status: "ok", comments: getComments[0].comments });
    }
    res.json({ status: "error", error: "No comments" });
  } catch (error) {
    next(error);
  }
};

module.exports = getComments;
