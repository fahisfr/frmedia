const mongoose = require("mongoose");
const { dbPost } = require("../dbSchemas/post");
const getPost = async (_, { postId }) => {
  try {
    let post = await dbPost.aggregate([
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
        $lookup: {
          from: "comments",
          localField: "comment",
          foreignField: "_id",
          as: "comments",
        },
      },
      {
        $project: {
          _id: 1,
          userInfo: {
            $arrayElemAt: ["$userInfo", 0],
          },
          content: 1,
          file: 1,
          postAt: 1,
          likes: 1,
          comments: {
            $arrayElemAt: ["$comments.comments", 0],
          },
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
        $project: {
          _id: 1,
          userInfo: 1,
          content: 1,
          file: 1,
          postAt: 1,
          likes: 1,
          comments: {
            _id: 1,
            content: 1,
            file: 1,
            likes: 1,
            commentAt: 1,
            userInfo: {
              $arrayElemAt: ["$comments.userInfo", 0],
            },
          },
        }
      },
      
      {
        $group: {
          _id: "$_id",
          userInfo: {
            $first: "$userInfo",
          },
          content: {
            $first: "$content",
          },
          file: {
            $first: "$file",
          },
          likes: {
            $first: "$likes",
          },
          postAt:{
            $first: "$postAt"
          },
          comments: {
            $push: "$comments",
          },
        },
      },
    ]);

    return post[0];
  } catch (err) {
    console.log(err);
  }
};

module.exports = getPost;
