const dbUser = require("../dbSchemas/user");
const { dbPost } = require("../dbSchemas/post");

const home = async (_) => {
  try {
    const userInfo = await dbUser.findById("62ead02431f8c32a78c6a91a");
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
        $project:{
          _id: 1,
          userInfo: {
            $arrayElemAt: ["$userInfo", 0],
          },
          content: 1,
          file: 1,
          postAt: 1,
          file: 1,
          likes: 1,
        }
      }
    ]);

    return { userInfo, posts:posts };
  } catch (err) {
    console.log(err);
  }
};

module.exports = home;
