const dbPost = require("../dbSchemas/post");
const objectId = require("mongoose").Types.ObjectId;
const { idIn } = require("../helper/dbHelper");

const getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { publicID } = req.user;

    if (!objectId.isValid(postId)) {
      res.json({ status: "error", error: "post not found" });
    }
    const post = await dbPost.aggregate([
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
        $addFields: {
          liked: idIn(publicID, "$likes"),
          likesCount: { $size: "$likes" },
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          liked: { $first: "$liked" },
          likesCount: { $first: "$likesCount" },
          text: { $first: "$text" },
          file: { $first: "$file" },
          postAt: { $first: "$postAt" },
          comments: { $push: "$comments" },
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
      {
        $project: {
          _id: 1,
          userInfo: {
            _id: 1,
            userName: 1,
            profilePic: 1,
            coverPic: 1,
            verified: 1,
          },
          userId: 1,
          text: 1,
          file: 1,
          postAt: 1,
          liked: 1,
          likesCount: 1,
          comments: {
            _id: 1,
            userId: 1,
            text: 1,
            file: 1,
            commentAt: 1,
            commentsCount: {
              $cond: [
                { $isArray: "$comments.replies" },
                { $size: "$comments.replies" },
                0,
              ],
            },
            likesCount: {
              $cond: [
                { $isArray: "$comments.likes" },
                { $size: "$comments.likes" },
                0,
              ],
            },
            liked: {
              $cond: [
                { $isArray: "$comments.likes" },
                idIn(publicID, "$comments.likes"),
                false,
              ],
            },
            userInfo: {
              _id: 1,
              userName: 1,
              profilePic: 1,
              coverPic: 1,
              verified: 1,
            },
          },
        },
      },
    ]);
    console.log(post);
    if (post.length > 0) {
      if (!post[0].comments[0]._id) {
        post[0].comments = [];
      }
      return res.json({ status: "ok", post: post[0] });
    }
    res.json({ status: "error", error: "Post not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = getPost;
