const dbPost = require("../dbSchemas/post");
const objectId = require("mongoose").Types.ObjectId;

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
        $project: {
          _id: 1,

          postAt: 1,
          likesCount: { $size: "$likes" },
          postAt: 1,
          userId: 1,
          text: 1,
          file: 1,
          postAt: 1,
          comments: {
            _id: 1,
            userId: 1,
            text: 1,
            file: 1,
            commentAt: 1,
          },
          userInfo: {
            userName: 1,
            profilePic: 1,
            coverPic: 1,
            isVerified: 1,
          },
        },
      },
      {
        $group: {
          _id: null,
          userId: { $first: "$userId" },
          text: { $first: "$text" },
          file: { $first: "$file" },
          postAt: { $first: "$postAt" },
          userInfo: { $first: "$userInfo" },
          comments: { $push: "$comments" },
        },
      },
    ]);
    console.log(post)
    if (post.length > 0) {
      res.json({ status: "ok", post: post[0] });

      return;
    }
    res.json({ status: "error", error: "Post not found" });
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = getPost;
