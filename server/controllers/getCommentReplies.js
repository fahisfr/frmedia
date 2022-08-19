const dbPost = require("../dbSchemas/post");
const ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");

const getReplies = async (_, { postId, commentId }, { INSERROR,}) => {
  
  try {
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
        $addFields:{
          "comments.replies.likesCount": {$size: "$comments.replies.likes"},
        }
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
      return {
        __typename: "replies",
        replies: result[0].replies,
      };
    }
    return {
      __typename: "Error",
      message: "No replies found",
    };
  } catch (error) {
    console.log(error);
    return INSERROR;
  }
};

module.exports = getReplies;
