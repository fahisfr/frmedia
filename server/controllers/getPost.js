const mongoose = require("mongoose");
const dbPost = require("../dbSchemas/post");
const { INTERNAL_SERVER_ERROR } = require("../config/customErrors");

const getPost = async (_, { postId }, { req }) => {
  try {
    const { id } = req.user;

    const post = await dbPost.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(postId),
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
        $unwind: "$comments",
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
        $group: {
          _id: "$_id",
          userInfo: { $first: "$userInfo" },
          content: { $first: "$content" },
          file: { $first: "$file" },
          likesCount: { $first: "$likesCount" },
          commentsCount: { $first: "$commentsCount" },
          comments: { $push: "$comments" },
          liked: { $first: { $in: [id, "$likes"] } },
        },
      },
    ]);

    if (post.length === 0) {
      return {
        __typename: "Error",
        message: "Post not found",
      };
    }

    return {
      __typename: "Post",
      ...post[0],
    };
  } catch (err) {
    return INTERNAL_SERVER_ERROR;
  }
};

module.exports = getPost;
