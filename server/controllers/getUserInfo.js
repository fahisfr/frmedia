const dbUser = require("../dbSchemas/user");
const objectId = require("mongoose").Types.ObjectId;

const getUserInfo = async (_, { userName }, { req, INSERR }) => {
  try {
    const { id } = req.user;
    const user = await dbUser.aggregate([
      {
        $match: {
          userName,
        },
      },
      {
        $unwind: {
          path: "$posts",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "posts",
          foreignField: "_id",
          as: "posts",
        },
      },
      {
        $set: {
          "posts.commentsCount": {
            $size: "$posts.comments",
          },
          "posts.likesCount": {
            $size: "$posts.likes",
          },
          "posts.liked": {
            $in: [objectId(id), "$posts.likes"],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          userName: { $first: "$userName" },
          email: { $first: "$email" },
          profilePic: { $first: "$profilePic" },
          coverPic: { $first: "$coverPic" },
          bio: { $first: "$bio" },
          isVerified: { $first: "$isVerified" },
          posts: { $push: { $arrayElemAt: ["$posts", 0] } },
          followersCount: { $first: { $size: "$followers" } },
          followingCount: { $first: { $size: "$following" } },
          followed: { $first: { $in: [objectId(id), "$followers"] } },
        },
      },
    ]);

    console.log(user);

    if (user.length > 0) {
      return {
        __typename: "User",
        ...user[0],
      };
    }
    return {
      __typename: "Error",
      message: "User not found",
    };
  } catch (error) {
    console.log(error);
    return INSERR;
  }
};

module.exports = getUserInfo;
