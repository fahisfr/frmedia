const dbPost = require("../dbSchemas/post");
const objectId = require("mongoose").Types.ObjectId;

const getPost = async (req, res, next) => {
  try {
    
    const { postId } = req.params;

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
        $addFields: {
          commentsCount: {
            $size: "$comments",
          },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },

      {
        $set: {
          userInfo: { $arrayElemAt: ["$userInfo", 0] },
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
        $set: {
          comments: {
            $cond: [
              {
                $ifNull: ["$comments.likes", false],
              },
              {
                likesCount: { $size: "$comments.likes" },
                repliesCount: { $size: "$comments.replies" },
              },
              null,
            ],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          userInfo: { $first: "$userInfo" },
          content: { $first: "$content" },
          file: { $first: "$file" },
          likesCount: { $first: { $size: "$likes" } },
          commentsCount: { $first: "$commentsCount" },
          comments: { $push: "$comments" },
          liked: { $first: { $in: [id, "$likes"] } },
        },
      },
    ]);

    if (post.length > 0) {
      res.json({ status: "ok", postInfo: post[0] });

      return;
    }
    res.json({ status: "error", error: "Post not found" });
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = getPost;
