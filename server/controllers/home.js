const dbUser = require("../dbSchemas/user");
const dbPost = require("../dbSchemas/post");

const { default: mongoose } = require("mongoose");

const home = async (req,res) => {
  try {
    const { id } = req.user;
    
    const userInfo = await dbUser.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $addFields: {
          followersCount: { $size: "$followers" },
          followingCount: { $size: "$following" },
        },
      },
    ]);

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
          },
        },
      },
    ]);


    return {
      __typename: "home",
      userInfo,
      posts,
    };
  } catch (err) {
    return INSERR
  }
};

module.exports = home;
