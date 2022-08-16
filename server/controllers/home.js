const dbUser = require("../dbSchemas/user");
const  dbPost  = require("../dbSchemas/post");
const { INTERNAL_SERVER_ERROR } = require("../config/customErrors");
const { default: mongoose } = require("mongoose");

const home = async (_, __, { req }, info) => {
  try {
    const { id } = req.user;
    const userInfo = await dbUser.findById(id);
    const posts = await dbPost.aggregate([
      {
        $match: {},
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
        $project: {
          _id: 1,
          userInfo: {
            $arrayElemAt: ["$userInfo", 0],
          },
          content: 1,
          file: 1,
          postAt: 1,
          file: 1,
          commentsCount: {
            $size: "$comments",
          },
          likesCount: {
            $size: "$likes",
          },
          liked: {
            $in: [mongoose.Types.ObjectId(id), "$likes"],
          }
        },
      },
    ]);


    return {
      __typename: "home",
      userInfo,
      posts,
    };
  } catch (err) {
    console.log(err);
    return INTERNAL_SERVER_ERROR;
  }
};

module.exports = home;
